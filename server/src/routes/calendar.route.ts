import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CalendarController from '@controllers/calendar.controller';
import authMiddleware from '@middlewares/auth.middleware';

class CalendarRoute implements Routes {
  public path = '/calendar';
  public router = Router();
  public calendarController = new CalendarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, this.calendarController.createCalendar);
    this.router.get(`${this.path}`, this.calendarController.getCalendar);
    this.router.get(`${this.path}/name`, this.calendarController.getCalendarName);
  }
}

export default CalendarRoute;
