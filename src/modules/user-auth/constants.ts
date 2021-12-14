import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstantsUser = {
  secret: process.env.ADMIN_JWT_SECRET_KEY,
  expiresIn: '1d',
};
