package com.usecasegrab.fullstackgrab.kafka;

import com.usecasegrab.fullstackgrab.model.Orders;
import com.usecasegrab.fullstackgrab.model.OrdersMongoDB;
import com.usecasegrab.fullstackgrab.repository.OrderRepository;
import com.usecasegrab.fullstackgrab.repository.OrderMongoDBRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderKafkaConsumer.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMongoDBRepository ordersMongoDBRepository;

    @KafkaListener(topics = "order-topic", groupId = "myGroup")
    public void consumeOrder(Orders order) {
        LOGGER.info(String.format("Order received: %s", order));

        orderRepository.save(order);
        LOGGER.info("Order saved to PostgreSQL database");

        OrdersMongoDB ordersMongoDB = convertToMongoDBOrder(order);
        ordersMongoDBRepository.save(ordersMongoDB);
        LOGGER.info("Order saved to MongoDB database");
    }

    @KafkaListener(topics = "order-topic", groupId = "myGroup")
    public void consumeUpdatedOrder(Orders order) {
        LOGGER.info(String.format("Updated order received: %s", order));

        updateOrderState(order.getOrderId(), "complete");

        LOGGER.info("Order status updated in PostgreSQL and MongoDB databases");
    }

    private void updateOrderState(int orderId, String newState) {

        Orders orderFromPostgres = orderRepository.findById(orderId).orElse(null);
        if (orderFromPostgres != null) {
            orderFromPostgres.setState(newState);
            orderRepository.save(orderFromPostgres);
        }

        OrdersMongoDB orderFromMongoDB = ordersMongoDBRepository.findByOrderId(orderId);
        if (orderFromMongoDB != null) {
            orderFromMongoDB.setState(newState);
            ordersMongoDBRepository.save(orderFromMongoDB);
        }
    }

    private OrdersMongoDB convertToMongoDBOrder(Orders order) {
        return OrdersMongoDB.builder()
                .orderId(order.getOrderId())
                .paxIdGsi(order.getPaxIdGsi())
                .orderDate(order.getOrderDate())
                .createdBy(order.getCreatedBy())
                .modifiedBy(order.getModifiedBy())
                .paxId(order.getPaxId())
                .state(order.getState())
                .totalItem(order.getTotalItem())
                .totalOrderPrice(order.getTotalOrderPrice())
                .build();
    }
}
