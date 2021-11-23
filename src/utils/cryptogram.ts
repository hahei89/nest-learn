import * as crypto from 'crypto'

/**
 * Make salt
 * @returns
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64')
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 * @returns 加密码
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, 'base64')
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64')
}
