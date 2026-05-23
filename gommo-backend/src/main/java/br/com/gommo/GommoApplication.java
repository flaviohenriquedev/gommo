package br.com.gommo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(dateTimeProviderRef = "auditingDateTimeProvider")
public class GommoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GommoApplication.class, args);
    }
}
