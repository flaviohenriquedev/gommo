package br.com.gommo.modules.collaborator.controller;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.gommo.support.AbstractIntegrationTest;
import com.jayway.jsonpath.JsonPath;
import java.util.List;
import org.junit.jupiter.api.Test;

class CollaboratorControllerIntegrationTest extends AbstractIntegrationTest {

    private static final String TEST_CPF = "529.982.247-25";

    private String accessToken;

    private void authenticateAndPrepare() throws Exception {
        var body =
                "{\"username\":\"%s\",\"password\":\"%s\"}".formatted(TEST_ADMIN_USERNAME, testAdminPassword);
        var login = postJson("/api/v1/auth/login", body, null);
        assertThat(login.statusCode()).isEqualTo(200);
        accessToken = JsonPath.read(login.body(), "$.accessToken");
        cleanupTestCollaborator();
    }

    /** Remove registro de execuções anteriores (mesmo CPF) para o fluxo CRUD ficar determinístico. */
    private void cleanupTestCollaborator() throws Exception {
        var list = get("/api/v1/collaborators", accessToken);
        if (list.statusCode() != 200) {
            return;
        }
        List<String> ids = JsonPath.read(list.body(), "$.[?(@.cpf == '" + TEST_CPF + "')].id");
        for (String id : ids) {
            delete("/api/v1/collaborators/" + id, accessToken);
        }
    }

    @Test
    void crudFlow_shouldWorkWithBaseControllerEndpoints() throws Exception {
        authenticateAndPrepare();

        var created = postJson(
                "/api/v1/collaborators",
                """
                {"fullName":"Maria Silva","cpf":"%s","birthDate":"1990-05-15"}
                """
                        .formatted(TEST_CPF),
                accessToken);

        assertThat(created.statusCode()).isEqualTo(201);
        String collaboratorId = JsonPath.read(created.body(), "$.id");

        var byId = get("/api/v1/collaborators/" + collaboratorId, accessToken);
        assertThat(byId.statusCode()).isEqualTo(200);
        assertThat((String) JsonPath.read(byId.body(), "$.fullName")).isEqualTo("Maria Silva");

        var list = get("/api/v1/collaborators", accessToken);
        assertThat(list.statusCode()).isEqualTo(200);
        assertThat(JsonPath.<List<String>>read(list.body(), "$[*].id")).contains(collaboratorId);

        var updated = putJson(
                "/api/v1/collaborators/" + collaboratorId,
                """
                {"fullName":"Maria Silva Santos","cpf":"%s","birthDate":"1990-05-15"}
                """
                        .formatted(TEST_CPF),
                accessToken);

        assertThat(updated.statusCode()).isEqualTo(200);
        assertThat((String) JsonPath.read(updated.body(), "$.fullName")).isEqualTo("Maria Silva Santos");

        var deleted = delete("/api/v1/collaborators/" + collaboratorId, accessToken);
        assertThat(deleted.statusCode()).isEqualTo(204);

        var afterDelete = get("/api/v1/collaborators/" + collaboratorId, accessToken);
        assertThat(afterDelete.statusCode()).isEqualTo(404);
    }

    @Test
    void findAll_shouldRequireAuthentication() throws Exception {
        var response = get("/api/v1/collaborators", null);
        assertThat(response.statusCode()).isEqualTo(403);
    }
}
