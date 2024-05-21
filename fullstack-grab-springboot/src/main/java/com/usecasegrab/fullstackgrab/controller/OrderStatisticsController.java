package com.usecasegrab.fullstackgrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.usecasegrab.fullstackgrab.services.OrderService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Order Statistics", description = "Order Statistics Management APIs")
@RestController
@RequestMapping("/api/orders")
public class OrderStatisticsController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/ongoing/{paxIdGsi}")
    public ResponseEntity<Object> getOngoingOrders(@PathVariable(name = "paxIdGsi") int paxIdGsi) {
        return orderService.getOngoingOrder(paxIdGsi);

    }

    @GetMapping("/historical")
    public ResponseEntity<Object> getHistoricalOrders(@RequestParam(name = "state", required = false) String state,
            @RequestParam(name = "paxIdGsi", required = false) Integer paxIdGsi) {
        return orderService.getHistoricalOrders(state, paxIdGsi);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Object> getStatisticsOrders() {
        return orderService.getStatisticsOrders();
    }

}
