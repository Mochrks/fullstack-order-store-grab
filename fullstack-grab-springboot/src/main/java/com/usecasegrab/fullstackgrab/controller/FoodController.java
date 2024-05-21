package com.usecasegrab.fullstackgrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.usecasegrab.fullstackgrab.dto.request.AddCartDTO;
import com.usecasegrab.fullstackgrab.dto.request.FoodFilterRequestDTO;
import com.usecasegrab.fullstackgrab.services.FoodListService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Food", description = "Food Management APIs")
@RestController
@RequestMapping("/api/")
public class FoodController {

    @Autowired
    private FoodListService foodListService;

    @GetMapping("/foods")
    public ResponseEntity<Object> getAllFoods(
            @PageableDefault(page = 0, size = 8, sort = "foodName", direction = Direction.ASC) Pageable page,
            @ModelAttribute FoodFilterRequestDTO foodFiltersDTO) {
        return foodListService.getAllFoods(page, foodFiltersDTO);
    }

    @GetMapping("/foods/cart/data")
    public ResponseEntity<Object> getDataCarts() {
        return foodListService.getDataCart();
    }

    @PostMapping("/foods/cart/")
    public ResponseEntity<Object> addToCart(@RequestBody AddCartDTO foodId) {
        return foodListService.addToCart(foodId);
    }

    @DeleteMapping("/foods/cart/{foodId}/")
    public ResponseEntity<Object> deleteCart(@PathVariable(name = "foodId") int foodId) {
        return foodListService.deleteCart(foodId);
    }

}
