import { AUTH_CLIENT_MESSAGES, AUTH_MESSAGES } from "@/modules/root/exceptions/auth.messages";
import {
  PERSON_CLIENT_MESSAGES,
  PERSON_MESSAGES,
} from "@/modules/person/exceptions/person.messages";
import { CORE_MESSAGES } from "@/shared/exceptions/core.messages";

const REGISTRY: Record<string, string> = {
  ...CORE_MESSAGES,
  ...AUTH_MESSAGES,
  ...AUTH_CLIENT_MESSAGES,
  ...PERSON_MESSAGES,
  ...PERSON_CLIENT_MESSAGES,
};

export function resolveMessageByCode(code: string | undefined, fallback: string): string {
  if (!code) return fallback;
  return REGISTRY[code] ?? fallback;
}

export function registerMessages(catalog: Record<string, string>): void {
  Object.assign(REGISTRY, catalog);
}
