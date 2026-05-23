# Setup local (Windows PowerShell) — cria .env se ainda nao existir
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Arquivo .env criado a partir de .env.example"
} else {
  Write-Host ".env ja existe — nada alterado"
}

if (-not (Test-Path "gommo-frontend\.env.local")) {
  Copy-Item "gommo-frontend\.env.example" "gommo-frontend\.env.local"
  Write-Host "Arquivo gommo-frontend\.env.local criado"
}

Write-Host ""
Write-Host "Subindo PostgreSQL..."
docker compose up -d
