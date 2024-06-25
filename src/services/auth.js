import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/User.js';
import { SessionsCollection } from '../db/models/Session.js';
import { generateTokens } from '../utils/generateTokens.js';

export async function registerUser(payload) {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
}

export async function loginUser(payload) {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(401, 'Wrong email or password!');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ userId: user._id });

  return await SessionsCollection.create({
    userId: user._id,
    ...generateTokens(),
  });
}

export async function refreshUserSession(refreshToken) {
  const session = await SessionsCollection.findOne({
    refreshToken,
  });
  if (!session) throw createHttpError(404, 'Session not found!');

  if (session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  await SessionsCollection.deleteOne({ userId: session.userId });

  return await SessionsCollection.create({
    userId: session.userId,
    ...generateTokens(),
  });
}

export async function logoutUser(refreshToken) {
  return await SessionsCollection.deleteOne({ refreshToken });
}