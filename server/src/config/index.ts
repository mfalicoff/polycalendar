import { config } from 'dotenv';
config({ path: require('find-config')('.env') });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASS, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
