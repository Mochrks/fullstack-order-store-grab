package com.usecasegrab.fullstackgrab.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodResponseDTO {
    private int foodId;
    private int price;
    private String foodName;
    private String location;
    private String imageFilename;

}
