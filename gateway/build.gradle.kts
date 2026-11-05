plugins {
	java
	id("org.springframework.boot") version "4.0.9"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.itasca.ballb"
version = "0.0.1-SNAPSHOT"
description = "BA.LLB API gateway"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

extra["springCloudVersion"] = "2025.1.4"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.cloud:spring-cloud-starter-gateway-server-webflux")
	testImplementation("org.springframework.boot:spring-boot-starter-actuator-test")
	testImplementation("io.projectreactor:reactor-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
