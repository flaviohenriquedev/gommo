/**
 * Mensagens do módulo Person — API e cliente (Unicode apenas em caracteres especiais).
 */
export const PERSON_MESSAGES = {
  PERSON_NOT_FOUND: "Pessoa n\u00e3o encontrada",
  PERSON_CPF_ALREADY_EXISTS: "CPF j\u00e1 cadastrado",
  /** Legado do backend anterior */
  CPF_ALREADY_EXISTS: "CPF j\u00e1 cadastrado",
} as const;

/** Exclusivas do frontend */
export const PERSON_CLIENT_MESSAGES = {
  PERSON_LOAD_FAILED: "N\u00e3o foi poss\u00edvel carregar a pessoa",
  PERSON_SAVE_FAILED: "N\u00e3o foi poss\u00edvel salvar a pessoa",
} as const;
