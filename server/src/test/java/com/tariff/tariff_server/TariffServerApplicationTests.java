package com.tariff.tariff_server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = TariffServerApplication.class)
@ActiveProfiles("test")
class TariffServerApplicationTests {

	@Test
	void contextLoads() {
		// This test verifies that the Spring context can be loaded
	}

}
