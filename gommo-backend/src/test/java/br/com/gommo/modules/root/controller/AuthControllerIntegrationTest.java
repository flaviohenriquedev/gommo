package br.com.gommo.modules.root.controller;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.gommo.support.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;

class AuthControllerIntegrationTest extends AbstractIntegrationTest {

    @Test
    void login_shouldReturnTokensForAdmin() throws Exception {
        var body =
                "{\"username\":\"%s\",\"password\":\"%s\"}".formatted(TEST_ADMIN_USERNAME, TEST_ADMIN_PASSWORD);
        var response = postJson("/api/v1/auth/login", body, null);

        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.body()).contains("accessToken").contains("refreshToken");
    }

    @Test
    void login_shouldRejectInvalidCredentials() throws Exception {
        var response = postJson("/api/v1/auth/login", "{\"username\":\"admin\",\"password\":\"wrong\"}", null);

        assertThat(response.statusCode()).isEqualTo(401);
    }
}
