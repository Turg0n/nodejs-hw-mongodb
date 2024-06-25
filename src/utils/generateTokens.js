import crypto from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../const/index.js';

export function generateTokens() {
  return {
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: Date.now() + FIFTEEN_MINUTES,
    refreshTokenValidUntil: Date.now() + THIRTY_DAYS,
  };
}