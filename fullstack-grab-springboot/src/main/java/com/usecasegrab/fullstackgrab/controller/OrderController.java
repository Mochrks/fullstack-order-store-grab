package com.usecasegrab.fullstackgrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.usecasegrab.fullstackgrab.services.OrderService;
import com.usecasegrab.fullstackgrab.common.Urls;

@Tag(name = "Order", description = "Order Management APIs")
@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping(Urls.CREATE_ORDER)
    public ResponseEntity<Object> createOrders() {
        return orderService.createOrder();
    }

    @PutMapping(Urls.UPDATE_ORDER)
    public ResponseEntity<Object> updateOrder(@PathVariable(name = "orderId") int orderId) {
        return orderService.updateOrder(orderId);
    }

    @GetMapping(Urls.GET_ORDER)
    public ResponseEntity<Object> getOrders(@PathVariable(name = "orderId") int orderId) {
        return orderService.getOrderById(orderId);
    }

}
