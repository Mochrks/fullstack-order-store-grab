package com.usecasegrab.fullstackgrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.usecasegrab.fullstackgrab.services.OrderService;

@Tag(name = "Order", description = "Order Management APIs")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<Object> createOrders() {
        return orderService.createOrder();
    }

    @PutMapping("/updated/{orderId}")
    public ResponseEntity<Object> updateOrder(@PathVariable(name = "orderId") int orderId) {
        return orderService.updateOrder(orderId);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Object> getOrders(@PathVariable(name = "orderId") int orderId) {
        return orderService.getOrderById(orderId);
    }

}
