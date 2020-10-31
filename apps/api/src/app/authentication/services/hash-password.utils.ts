import {pbkdf2Sync, randomBytes} from "crypto";

export function hashUserPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return { salt, passwordHash };
}

export function verifyUserPassword(password: string, hash: string, salt: string): boolean {
  const passwordHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return passwordHash === hash;
}
