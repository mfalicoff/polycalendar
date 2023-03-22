import CalendarService from '@services/calendar.service';
import { NextFunction, Request, Response } from 'express';

class CalendarController {
  public calendarService = new CalendarService();

  public createCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calendar = await this.calendarService.createCalendar(req.body.calendar);
      console.log(calendar);
      res.status(200).json({ data: calendar, message: 'create calendar' });
    } catch (error) {
      next(error);
    }
  };

  public getCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calendar = await this.calendarService.getCalendar();
      res.status(200).json({ data: calendar, message: 'get calendar' });
    } catch (error) {
      next(error);
    }
  };
}

export default CalendarController;
