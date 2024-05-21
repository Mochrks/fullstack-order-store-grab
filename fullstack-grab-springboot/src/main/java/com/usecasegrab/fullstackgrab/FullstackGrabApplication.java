package com.usecasegrab.fullstackgrab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = { "com.usecasegrab.fullstackgrab", "lib.i18n", })
@EnableJpaAuditing
public class FullstackGrabApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackGrabApplication.class, args);
	}

}
