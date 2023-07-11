import { Strings } from '../dataType/strings.js';
import { Regex } from '../library/regex.js';

export class Password extends Strings {
  // VALIDATION MESSAGES
  static PASSWORD_MESSAGE_BLANK = "Password cannot be blank";
  static PASSWORD_MESSAGE_NO_MATCH = "Passwords don't match";
  static PASSWORD_MESSAGE_ALREADY_USED = "Cannot use the same password twice";
  static PASSWORD_MESSAGE_CONTAINS_USER_NAME = "You cannot use your name in your password";
  static PASSWORD_MESSAGE_SIMILAR_TO_PREVIOUS = "New password is too similar to the old one";
  static PASSWORD_MESSAGE_GOOD_PASSWORD = "Password is compliant";
  static PASSWORD_MESSAGE_GOOD_PASSWORD_STRENGTH = "Password is compliant";
  static PASSWORD_MESSAGE_BAD_PASSWORD = "Bad password! Try again.";
  static PASSWORD_MESSAGE_UNKNOWN = "Unknown error. Try again.";

  constructor() {
    super();
    this.regexLibrary = new Regex();
  }

  checkPasswordRequirements(currentPassword, password, passwordConfirmation, userInformation = []) {
    if (!password || password.trim() === '') {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_BLANK
      };
    }

    if (password !== passwordConfirmation) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_NO_MATCH
      };
    }

    if (password === currentPassword) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_ALREADY_USED
      };
    }

    const lowercasePassword = password.toLowerCase();
    const { first_name, surname } = userInformation;

    if (first_name && lowercasePassword.includes(first_name.toLowerCase())) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_CONTAINS_USER_NAME
      };
    }

    if (surname && lowercasePassword.includes(surname.toLowerCase())) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_CONTAINS_USER_NAME
      };
    }

    if (lowercasePassword === currentPassword.toLowerCase()) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_SIMILAR_TO_PREVIOUS
      };
    }

    const check = this.checkPasswordStrength(password);
    if (check.isValid) {
      return {
        is_valid: false,
        message: Password.PASSWORD_MESSAGE_GOOD_PASSWORD_STRENGTH + check.message
      };
    }

    return {
      is_valid: false,
      message: Password.PASSWORD_MESSAGE_BAD_PASSWORD
    };
  }

  checkPasswordStrength(password) {
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be a minimum of 8 characters long"
      };
    }

    if (Array.from(new Set(password)).length < password.length / 2) {
      return {
        isValid: false,
        message: "Password is too simple. Please use more unique characters"
      };
    }

    if (!password.match(this.regexLibrary.getRegexForAlphaUpper())) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase character"
      };
    }

    if (!password.match(this.regexLibrary.getRegexForAlphaLower())) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase character"
      };
    }

    if (!password.match(this.regexLibrary.getRegexForNumeric())) {
      return {
        isValid: false,
        message: "Password must contain at least one number"
      };
    }

    return {
      isValid: true,
      message: Password.PASSWORD_MESSAGE_GOOD_PASSWORD
    };
  }
}
