package com.usecasegrab.fullstackgrab.common;

public class Urls {

    // foods
    public static final String GET_ALL_DATA_FOOD = "/foods";
    public static final String CARTS = GET_ALL_DATA_FOOD + "/cart";
    public static final String GET_ALL_DATA_CARTS = CARTS + "/data";
    public static final String ADD_CARTS = CARTS + "/";
    public static final String DELETE_CART = CARTS + "/{foodId}/";

    // orders
    public static final String ORDERS_BASE = "/orders";
    public static final String CREATE_ORDER = ORDERS_BASE + "/create";
    public static final String UPDATE_ORDER = ORDERS_BASE + "/updated/{orderId}";
    public static final String GET_ORDER = ORDERS_BASE + "/{orderId}";

    // order statistics
    public static final String ONGOING_ORDERS = ORDERS_BASE + "/ongoing/{paxIdGsi}";
    public static final String HISTORICAL_ORDERS = ORDERS_BASE + "/historical";
    public static final String STATISTICS_ORDERS = ORDERS_BASE + "/statistics";
}
