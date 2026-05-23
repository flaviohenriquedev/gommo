import { AppException } from "@/shared/exceptions/app.exception";
import { PERSON_CLIENT_MESSAGES } from "@/modules/person/exceptions/person.messages";

/** Exceções exclusivas do frontend — módulo Person */
export class PersonClientException {
  private constructor() {}

  static loadFailed(): AppException {
    return AppException.client(
      "PERSON_LOAD_FAILED",
      PERSON_CLIENT_MESSAGES.PERSON_LOAD_FAILED,
    );
  }

  static saveFailed(): AppException {
    return AppException.client(
      "PERSON_SAVE_FAILED",
      PERSON_CLIENT_MESSAGES.PERSON_SAVE_FAILED,
    );
  }
}
