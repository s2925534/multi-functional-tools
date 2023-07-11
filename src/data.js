import { Basic } from './basic';

export class Data extends Basic {
  constructor() {
    super();
  }

  getPDO(dbSettings) {
    return new PDO(
      `mysql:host=${dbSettings.host}:${dbSettings.port};dbname=${dbSettings.name}`,
      dbSettings.username,
      dbSettings.password
    );
  }

  strinpDBError(exception) {
    const messageArray = [];
    const clean = `${exception.message.substring(0, exception.message.lastIndexOf('_'))}'`;

    clean.match(/'.*?'|'.*?'/g).forEach((message) => {
      messageArray.push(message);
    });

    const field = messageArray[1].replace('_', ' ').replace('IDX', '').toUpperCase();
    return `The value ${messageArray[0]} given for ${field} is not unique. Try a different one.`;
  }
}
