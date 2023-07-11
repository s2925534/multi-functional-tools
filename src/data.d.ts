import { Basic } from './basic';

export declare class Data extends Basic {
  constructor();

  getPDO(dbSettings: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  }): PDO;

  strinpDBError(exception: Exception): string;
}
