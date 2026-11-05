package com.itasca.ballb.curriculum;

import org.springframework.boot.SpringApplication;

public class TestCurriculumServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(CurriculumServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
