# Gommo Backend

## Pré-requisitos

- Java 21
- Maven
- Docker (PostgreSQL)
- Arquivo `.env` configurado (veja `.env.example` e `.env.example` na raiz do monorepo)

## Subir banco

Na raiz do monorepo, com `.env` criado:

```bash
docker compose up -d
```

## Testes

Requer PostgreSQL rodando e variáveis de teste (senha padrão de integração apenas em `application-test.yml`):

```bash
cd gommo-backend
mvn test
```

## Executar API

```bash
cd gommo-backend
mvn spring-boot:run
```

Perfil `dev`: cria usuário admin se `DEV_ADMIN_PASSWORD` estiver definido (veja `.env.example`).

## Endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `CRUD /api/v1/persons`
- `GET /actuator/health`

API local: http://localhost:8081
