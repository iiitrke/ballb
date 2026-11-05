package com.itasca.ballb.site;

import org.springframework.boot.SpringApplication;

public class TestSiteServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(SiteServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
