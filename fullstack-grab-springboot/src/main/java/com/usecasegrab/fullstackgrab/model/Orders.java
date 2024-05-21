package com.usecasegrab.fullstackgrab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Orders implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_orders_order_id_seq")
    @SequenceGenerator(name = "generator_orders_order_id_seq", sequenceName = "orders_order_id_seq", schema = "public", allocationSize = 1)
    @Column(name = "order_id", unique = true, nullable = false)
    private int orderId;

    @Column(name = "pax_id_gsi")
    private int paxIdGsi;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "created_by")
    private String createdBy;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", length = 29)
    private Timestamp createdAt;

    @Column(name = "modified_by")
    private String modifiedBy;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_time", length = 29)
    private Timestamp modifiedTime;

    @Column(name = "pax_id")
    private String paxId;

    @Column(name = "state")
    private String state;

    @Column(name = "total_item")
    private Integer totalItem;

    @Column(name = "total_order_price")
    private Integer totalOrderPrice;

    @OneToMany(mappedBy = "orders")
    private Set<Carts> cartses;

    @OneToMany(mappedBy = "orders")
    private Set<Pax> paxs;

}