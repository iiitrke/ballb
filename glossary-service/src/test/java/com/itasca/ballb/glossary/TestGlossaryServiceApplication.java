package com.itasca.ballb.glossary;

import org.springframework.boot.SpringApplication;

public class TestGlossaryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(GlossaryServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
