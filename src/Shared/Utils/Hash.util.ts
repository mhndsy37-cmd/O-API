import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 8;
async function hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
}
async function comparePassword(
    plainPassword: string,
    hashedPassword: string,
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}
export {hashPassword,comparePassword}