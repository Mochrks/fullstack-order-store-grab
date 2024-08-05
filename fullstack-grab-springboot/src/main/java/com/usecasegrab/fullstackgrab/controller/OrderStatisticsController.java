package com.usecasegrab.fullstackgrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.usecasegrab.fullstackgrab.services.OrderService;
import com.usecasegrab.fullstackgrab.common.Urls;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Order Statistics", description = "Order Statistics Management APIs")
@RestController
@RequestMapping("/api")
public class OrderStatisticsController {

    @Autowired
    private OrderService orderService;

    @GetMapping(Urls.ONGOING_ORDERS)
    public ResponseEntity<Object> getOngoingOrders(@PathVariable(name = "paxIdGsi") int paxIdGsi) {
        return orderService.getOngoingOrder(paxIdGsi);

    }

    @GetMapping(Urls.HISTORICAL_ORDERS)
    public ResponseEntity<Object> getHistoricalOrders(@RequestParam(name = "state", required = false) String state,
            @RequestParam(name = "paxIdGsi", required = false) Integer paxIdGsi) {
        return orderService.getHistoricalOrders(state, paxIdGsi);
    }

    @GetMapping(Urls.STATISTICS_ORDERS)
    public ResponseEntity<Object> getStatisticsOrders() {
        return orderService.getStatisticsOrders();
    }

}
