import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ClassRoute from '@routes/class.route';
import validateEnv from '@utils/validateEnv';
import CalendarRoute from '@routes/calendar.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ClassRoute(), new CalendarRoute()]);

app.listen();
