package com.usecasegrab.fullstackgrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.usecasegrab.fullstackgrab.model.Orders;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
    Optional<Orders> findById(int orderId);

    @Query("SELECT o FROM Orders o WHERE o.paxIdGsi = :paxIdGsi AND o.state = 'ongoing'")
    List<Orders> findOngoingOrdersByPaxIdGsi(@Param("paxIdGsi") int paxIdGsi);

    List<Orders> findByPaxIdGsi(int paxIdGsi);

    @Query("SELECT o FROM Orders o WHERE o.state = :state")
    List<Orders> findByState(@Param("state") String state);

    @Query("SELECT o FROM Orders o WHERE o.paxIdGsi = :paxId")
    List<Orders> findByPaxId(@Param("paxId") String paxId);

}