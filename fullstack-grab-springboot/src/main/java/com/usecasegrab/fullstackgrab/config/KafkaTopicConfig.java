package com.usecasegrab.fullstackgrab.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic orderStoreTopic() {
        return TopicBuilder.name("orderstore")
                .build();
    }

    @Bean
    public NewTopic orderStoreJsonTopic() {
        return TopicBuilder.name("orderstorejson")
                .build();
    }

}
