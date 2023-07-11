import { Strings } from '../dataType/strings';
import { Regex } from '../library/regex';

export declare class Password extends Strings {
  static PASSWORD_MESSAGE_BLANK: string;
  static PASSWORD_MESSAGE_NO_MATCH: string;
  static PASSWORD_MESSAGE_ALREADY_USED: string;
  static PASSWORD_MESSAGE_CONTAINS_USER_NAME: string;
  static PASSWORD_MESSAGE_SIMILAR_TO_PREVIOUS: string;
  static PASSWORD_MESSAGE_GOOD_PASSWORD: string;
  static PASSWORD_MESSAGE_GOOD_PASSWORD_STRENGTH: string;
  static PASSWORD_MESSAGE_BAD_PASSWORD: string;
  static PASSWORD_MESSAGE_UNKNOWN: string;

  regexLibrary: Regex;

  constructor();

  checkPasswordRequirements(
    currentPassword: string,
    password: string,
    passwordConfirmation: string,
    userInformation?: { [key: string]: any }
  ): { is_valid: boolean; message: string };

  checkPasswordStrength(password: string): { isValid: boolean; message: string };
}
