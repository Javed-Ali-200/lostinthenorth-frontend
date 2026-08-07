import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'WicxnWJeL71UIGDSzvCmvOH8yBYLdwsYC0ZUKhqTwKH';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: '7d',
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
