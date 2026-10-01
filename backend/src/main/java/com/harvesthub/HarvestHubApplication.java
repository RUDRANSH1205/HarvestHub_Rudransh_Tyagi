package com.harvesthub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

// Users are stored in MongoDB and authenticated with JWT, so Spring's default in-memory user is disabled.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class HarvestHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(HarvestHubApplication.class, args);
    }
}
