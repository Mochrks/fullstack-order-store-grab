package com.usecasegrab.fullstackgrab.repository;

import java.util.Optional;
import com.usecasegrab.fullstackgrab.model.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface FoodRepository extends JpaRepository<Foods, Integer>, JpaSpecificationExecutor<Foods> {
    @Query("SELECT r FROM Foods r WHERE r.foodId = :foodId ")
    Optional<Foods> findByMyFoods(@Param("foodId") int foodId);
}
