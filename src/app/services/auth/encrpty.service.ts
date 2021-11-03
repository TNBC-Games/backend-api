import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Encrypt = async (Value: string) => {
    const salt: string = await bcrypt.genSalt(10);
    const encryptedString = await bcrypt.hash(Value, salt);
    return encryptedString;
};

export const CompareString = async (Value: string, encryptedString: string) => {
    return await bcrypt.compare(Value, encryptedString);
};

export const SignJwt = (payload: any, secret: string, expiry: string): string => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
};

export const GenEmailCode = (): string => {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string = '';
    for (let i = 0; i <= 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};
