package br.com.gommo.support;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

/**
 * Requer PostgreSQL local (docker compose up). Perfil {@code test}.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Tag("integration")
public abstract class AbstractIntegrationTest {

    protected static final String TEST_ADMIN_USERNAME = "admin";

    @Value("${gommo.dev.admin-password}")
    private String configuredAdminPassword;

    /** Senha do admin no banco (mesma resolução do application-test.yml / .env). */
    protected String testAdminPassword;

    @LocalServerPort
    protected int port;

    @Autowired(required = false)
    private HttpClient injectedClient;

    protected HttpClient httpClient;
    protected String baseUrl;

    @BeforeEach
    void setupHttp() {
        httpClient = injectedClient != null ? injectedClient : HttpClient.newHttpClient();
        baseUrl = "http://localhost:" + port;
        testAdminPassword = configuredAdminPassword;
    }

    protected HttpResponse<String> postJson(String path, String json, String bearerToken) throws Exception {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json));

        if (bearerToken != null) {
            builder.header("Authorization", "Bearer " + bearerToken);
        }

        return httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }

    protected HttpResponse<String> get(String path, String bearerToken) throws Exception {
        HttpRequest.Builder builder =
                HttpRequest.newBuilder().uri(URI.create(baseUrl + path)).GET();

        if (bearerToken != null) {
            builder.header("Authorization", "Bearer " + bearerToken);
        }

        return httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }

    protected HttpResponse<String> putJson(String path, String json, String bearerToken) throws Exception {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .header("Content-Type", "application/json")
                .PUT(HttpRequest.BodyPublishers.ofString(json));

        if (bearerToken != null) {
            builder.header("Authorization", "Bearer " + bearerToken);
        }

        return httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }

    protected HttpResponse<String> delete(String path, String bearerToken) throws Exception {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .DELETE();

        if (bearerToken != null) {
            builder.header("Authorization", "Bearer " + bearerToken);
        }

        return httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }
}
