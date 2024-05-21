package com.usecasegrab.fullstackgrab.repository;

import com.usecasegrab.fullstackgrab.model.OrdersMongoDB;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMongoDBRepository extends MongoRepository<OrdersMongoDB, String> {

    OrdersMongoDB findByOrderId(int orderId);
}
