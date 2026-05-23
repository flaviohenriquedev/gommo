package br.com.gommo.modules.person.controller;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.gommo.support.AbstractIntegrationTest;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PersonControllerIntegrationTest extends AbstractIntegrationTest {

    private String accessToken;

    @BeforeEach
    void authenticate() throws Exception {
        var body =
                "{\"username\":\"%s\",\"password\":\"%s\"}".formatted(TEST_ADMIN_USERNAME, TEST_ADMIN_PASSWORD);
        var login = postJson("/api/v1/auth/login", body, null);
        accessToken = JsonPath.read(login.body(), "$.accessToken");
    }

    @Test
    void crudFlow_shouldWorkWithBaseControllerEndpoints() throws Exception {
        var created = postJson(
                "/api/v1/persons",
                """
                {"fullName":"Maria Silva","cpf":"529.982.247-25","birthDate":"1990-05-15"}
                """,
                accessToken);

        assertThat(created.statusCode()).isEqualTo(201);
        String personId = JsonPath.read(created.body(), "$.id");

        var list = get("/api/v1/persons", accessToken);
        assertThat(list.statusCode()).isEqualTo(200);
        assertThat((int) JsonPath.read(list.body(), "$.length()")).isEqualTo(1);

        var updated = putJson(
                "/api/v1/persons/" + personId,
                """
                {"fullName":"Maria Silva Santos","cpf":"529.982.247-25","birthDate":"1990-05-15"}
                """,
                accessToken);

        assertThat(updated.statusCode()).isEqualTo(200);
        assertThat((String) JsonPath.read(updated.body(), "$.fullName")).isEqualTo("Maria Silva Santos");

        var deleted = delete("/api/v1/persons/" + personId, accessToken);
        assertThat(deleted.statusCode()).isEqualTo(204);

        var empty = get("/api/v1/persons", accessToken);
        assertThat((int) JsonPath.read(empty.body(), "$.length()")).isEqualTo(0);
    }

    @Test
    void findAll_shouldRequireAuthentication() throws Exception {
        var response = get("/api/v1/persons", null);
        assertThat(response.statusCode()).isEqualTo(403);
    }
}
