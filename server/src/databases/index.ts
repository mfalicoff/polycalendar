import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from '@config';

export const dbConnection = {
  url: `${DB_HOST}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: DB_USER,
    pass: DB_PASS,
    authSource: 'admin',
  },
};
