# Instruções Cursor (rascunhos)

Pasta para escrever e organizar regras do projeto antes de ativá-las no agente.

## Como usar

1. Edite ou duplique `template-regras.mdc` com o nome da sua regra.
2. Preencha o frontmatter (`description`, `globs`, `alwaysApply`) e o conteúdo em markdown.
3. Quando estiver pronta, **ative** de um destes jeitos:
   - Copie o arquivo para `.cursor/rules/` (ex.: `.cursor/rules/minha-regra.mdc`), **ou**
   - Mova o arquivo de `.cursor/instrucoes/` para `.cursor/rules/`.

O Cursor carrega automaticamente apenas arquivos `.mdc` em `.cursor/rules/`.

## Regras já ativas no projeto

| Arquivo | Escopo |
|---------|--------|
| `.cursor/rules/gommo.mdc` | Padrões gerais do monólito |
| `.cursor/rules/gommo-frontend-ui.mdc` | Convenções técnicas do frontend |
| `.cursor/rules/gommo-ui-system.mdc` | Design system Stripe/Linear (UI) |

Edite `gommo-ui-system.mdc` nesta pasta e sincronize com `.cursor/rules/gommo-ui-system.mdc` quando alterar.

## Campos do frontmatter

- `alwaysApply: true` — aplica em toda conversa.
- `globs: gommo-frontend/**/*.tsx` — aplica só ao abrir arquivos que batem o padrão.
- `description` — texto curto exibido no seletor de regras do Cursor.
