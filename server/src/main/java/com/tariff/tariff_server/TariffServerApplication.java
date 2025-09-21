package com.tariff.tariff_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.tariff")
@EnableJpaRepositories(basePackages = "com.tariff.repo")
@EntityScan(basePackages = "com.tariff.domain")
public class TariffServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TariffServerApplication.class, args);
	}

}
