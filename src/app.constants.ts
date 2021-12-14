import * as dotenv from 'dotenv';

dotenv.config();

export const mongoConstantsConnection = {
  mongo_url: process.env.DB_URL,
};
