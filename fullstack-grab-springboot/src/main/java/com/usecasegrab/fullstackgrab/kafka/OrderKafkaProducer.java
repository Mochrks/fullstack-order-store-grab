package com.usecasegrab.fullstackgrab.kafka;

import com.usecasegrab.fullstackgrab.model.Orders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaProducer {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderKafkaProducer.class);

    @Autowired
    private KafkaTemplate<String, Orders> kafkaTemplate;

    public void sendOrder(Orders order) {
        LOGGER.info(String.format("Order sent: %s", order));
        kafkaTemplate.send("order-topic", order);
    }

    public void updateOrderStatus(Orders order) {
        LOGGER.info(String.format("Updating order status: %s", order));
        kafkaTemplate.send("order-topic", String.valueOf(order.getOrderId()), order);
    }

}
