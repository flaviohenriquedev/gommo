# Gommo

Monorepo RH / Departamento Pessoal — backend (Spring Boot), frontend (Next.js) e infra (Docker).

| Projeto | Pasta | Documentação |
|---------|-------|----------------|
| API | `gommo-backend/` | [README do backend](gommo-backend/README.md) |
| Web | `gommo-frontend/` | [README do frontend](gommo-frontend/README.md) |

## Início rápido

1. Copie `.env.example` para `.env` na raiz e defina as variáveis (senha do Postgres, JWT, admin dev).
2. `docker compose up -d`
3. Backend: `cd gommo-backend && mvn spring-boot:run` → http://localhost:8081
4. Frontend: `cd gommo-frontend && npm install && npm run dev` → http://localhost:3000

---

## Exceções e mensagens

O sistema usa **códigos estáveis** (`code`) na API e **mensagens em português** nos catálogos de cada módulo.

**Regra de encoding nos fontes:** use texto ASCII normal (`CPF`, `Erro`, `login`…) e escape `\uXXXX` **somente em caracteres especiais** (acentos, cedilha, etc.), para evitar quebra de charset no build sem prejudicar a leitura do código.

**Conversor recomendado (texto → `\uXXXX`):**  
https://www.esoapi.com/pt/unicode/converter/

**Referência de caracteres Unicode:**  
https://unicode-table.com/pt/

### Mapa de caracteres especiais (PT-BR)

| Caractere | Unicode | Escape Java / TypeScript |
|-----------|---------|---------------------------|
| á | U+00E1 | `\u00e1` |
| à | U+00E0 | `\u00e0` |
| â | U+00E2 | `\u00e2` |
| ã | U+00E3 | `\u00e3` |
| ç | U+00E7 | `\u00e7` |
| é | U+00E9 | `\u00e9` |
| ê | U+00EA | `\u00ea` |
| í | U+00ED | `\u00ed` |
| ó | U+00F3 | `\u00f3` |
| ô | U+00F4 | `\u00f4` |
| õ | U+00F5 | `\u00f5` |
| ú | U+00FA | `\u00fa` |
| Á | U+00C1 | `\u00c1` |
| É | U+00C9 | `\u00c9` |
| Ê | U+00CA | `\u00ca` |
| Ç | U+00C7 | `\u00c7` |
| Ã | U+00C3 | `\u00c3` |

Exemplo no código:

```java
public static final String MSG = "CPF j\u00e1 cadastrado";
```

```typescript
PERSON_CPF_ALREADY_EXISTS: "CPF j\u00e1 cadastrado";
```

### Mapa de códigos de erro (`code`)

Resposta padrão da API (`4xx` / `5xx`):

```json
{
  "code": "PERSON_CPF_ALREADY_EXISTS",
  "message": "CPF já cadastrado",
  "correlationId": "uuid",
  "timestamp": "2026-05-22T12:00:00Z"
}
```

#### Núcleo (Core)

| Código | HTTP | Mensagem exibida |
|--------|------|------------------|
| `VALIDATION_ERROR` | 400 | Erro de validação |
| `FORBIDDEN` | 403 | Você não tem permissão para esta ação |
| `INTERNAL_ERROR` | 500 | Ocorreu um erro inesperado |
| `UNKNOWN` | — | Ocorreu um erro inesperado *(somente frontend)* |

**Backend:** `gommo-backend/.../core/exception/CoreExceptions.java`  
**Frontend:** `gommo-frontend/src/shared/exceptions/core.messages.ts`

#### Auth

| Código | HTTP | Mensagem exibida |
|--------|------|------------------|
| `AUTH_INVALID_CREDENTIALS` | 401 | Usuário ou senha inválidos |
| `AUTH_INVALID_REFRESH` | 401 | Token de atualização inválido |
| `AUTH_REVOKED_REFRESH` | 401 | Sessão expirada. Faça login novamente |
| `AUTH_EXPIRED_REFRESH` | 401 | Sessão expirada. Faça login novamente |
| `AUTH_USER_NOT_FOUND` | 404 | Usuário não encontrado |
| `AUTH_ERROR` | — | Falha na autenticação *(frontend)* |
| `AUTH_SESSION_EXPIRED` | 401 | Sessão expirada. Faça login novamente *(somente frontend)* |

**Backend:** `gommo-backend/.../modules/root/exception/AuthExceptions.java`  
**Frontend:** `gommo-frontend/src/modules/root/exceptions/auth.messages.ts`

#### Colaboradores

| Código | HTTP | Mensagem exibida |
|--------|------|------------------|
| `COLLABORATOR_NOT_FOUND` | 404 | Colaborador não encontrado |
| `COLLABORATOR_CPF_ALREADY_EXISTS` | 409 | CPF já cadastrado |
| `CPF_ALREADY_EXISTS` | — | CPF já cadastrado *(alias legado no frontend)* |
| `COLLABORATOR_LOAD_FAILED` | — | Não foi possível carregar o colaborador *(somente frontend)* |
| `COLLABORATOR_SAVE_FAILED` | — | Não foi possível salvar o colaborador *(somente frontend)* |

**Backend:** `gommo-backend/.../modules/collaborator/exception/CollaboratorExceptions.java`  
**Frontend:** `gommo-frontend/src/modules/collaborator/exceptions/collaborator.messages.ts`

### Onde implementar

| Camada | Padrão |
|--------|--------|
| Backend | `{Modulo}Exceptions.java` (catálogo) + `{Modulo}Exception.java` (fábricas) |
| Frontend API | `{modulo}.messages.ts` + registro em `message-registry.ts` |
| Frontend cliente | `{modulo}.messages.ts` (`*_CLIENT_MESSAGES`) + `{modulo}.client-exception.ts` |
| Captura global | `ExceptionCapture` em `gommo-frontend/src/shared/exceptions/` |

```typescript
import { ExceptionCapture } from "@/shared/exceptions";

ExceptionCapture.handle(error); // toast + AppException
ExceptionCapture.displayMessage(error); // só texto
```
