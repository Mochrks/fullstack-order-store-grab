package com.usecasegrab.fullstackgrab.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodFilterRequestDTO {
    private Integer userId;
    // tambah validasi
    private String foodName;
    private Integer categoryId;

}
