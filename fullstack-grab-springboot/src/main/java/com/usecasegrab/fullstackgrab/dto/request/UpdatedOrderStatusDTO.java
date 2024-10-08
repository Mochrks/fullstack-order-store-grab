package com.usecasegrab.fullstackgrab.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatedOrderStatusDTO {
    private int orderId;
    private String newStatus;
}
