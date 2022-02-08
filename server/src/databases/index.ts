import { DB_HOST, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `${DB_HOST}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
