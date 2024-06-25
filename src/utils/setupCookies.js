import { ONE_DAY } from '../const/index.js';

export function setupCookies(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
}