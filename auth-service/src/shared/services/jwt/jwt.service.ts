import jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt.payload';
import { TokenResult } from './jwt.result';
import { logger } from '../../logger/logger';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN_SECONDS = 3600;

export class JwtService {
  static generateToken(payload: JwtPayload): TokenResult {

    if (!JWT_SECRET) {
      logger.error('❌ JWT_SECRET não definido nas variáveis de ambiente');
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN_SECONDS,
    });

    const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN_SECONDS;
    return { token, expiresAt };
  }
}
