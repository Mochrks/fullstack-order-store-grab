package com.usecasegrab.fullstackgrab.repository;

import com.usecasegrab.fullstackgrab.model.Carts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartsRepository extends JpaRepository<Carts, Integer> {

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM Carts c WHERE c.foods.foodId = :foodId")
    Boolean existsByFoodId(@Param("foodId") int foodId);

    @Query("SELECT COUNT(c) FROM Carts c WHERE c.isDeleted = false")
    Long countByIsDeletedFalse();

    @Query("SELECT SUM(c.foods.price * c.qty) FROM Carts c WHERE c.isDeleted = false")
    Integer totalPriceByFoodIdAndNotDeleted();

    List<Carts> findByIsDeletedFalse();

    Carts findByFoodsFoodIdAndIsDeletedFalse(int foodId);

    // kueri khusus untuk menemukan semua item yang belum dihapus dari
    // keranjang
    @Query("SELECT c FROM Carts c WHERE c.isDeleted = false")
    List<Carts> findAllByIsDeletedFalse();

}