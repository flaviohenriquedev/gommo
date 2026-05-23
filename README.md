# Gommo — Departamento Pessoal

Monolito modular para gestão de RH e departamento pessoal.

## Estrutura

| Pasta | Stack |
|-------|--------|
| `gommo-backend/` | Java 21, Spring Boot 4, PostgreSQL, Flyway, JWT |
| `gommo-frontend/` | Next.js 16, React 19, DaisyUI (tema `gommo`), NextAuth |
| `docker-compose.yml` | PostgreSQL 16 (dev) |

## Pré-requisitos

- Docker Desktop
- JDK 21 + Maven 3.9+
- Node.js 20+

## Configuração de ambiente (obrigatório)

1. Copie `.env.example` para `.env` na **raiz** do monorepo e defina senhas locais.
2. Copie `gommo-backend/.env.example` para `gommo-backend/.env` (ou use as mesmas variáveis).
3. Copie `gommo-frontend/.env.example` para `gommo-frontend/.env.local`.

Nunca commite arquivos `.env` ou `.env.local` — eles estão no `.gitignore`.

## Subir ambiente (Windows PowerShell)

```powershell
docker compose up -d
cd gommo-backend
mvn spring-boot:run
cd ..\gommo-frontend
npm install
npm run dev
```

- **API:** http://localhost:8081  
- **Web:** http://localhost:3000  
- **Login:** usuário `admin` (ou `DEV_ADMIN_USERNAME`) com a senha definida em `DEV_ADMIN_PASSWORD`

## Fase 01 (entregue)

- Backend: core, auth JWT, módulo Person CRUD, RBAC, Flyway, testes de integração
- Frontend: login, shell, dashboard, Person, tema DaisyUI `gommo`

## Repositório

https://github.com/flaviohenriquedev/gommo.git
