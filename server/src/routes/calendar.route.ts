import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CalendarController from '@controllers/calendar.controller';

class CalendarRoute implements Routes {
  public path = '/calendar';
  public router = Router();
  public calendarController = new CalendarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.calendarController.createCalendar);
    this.router.get(`${this.path}`, this.calendarController.getCalendar);
  }
}

export default CalendarRoute;
