import CalendarService from '@services/calendar.service';
import { NextFunction, Request, Response } from 'express';

class CalendarController {
  public calendarService = new CalendarService();

  public createCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const semesterCalendar = await this.calendarService.createCalendar(req.body);
      console.log(semesterCalendar);
      res.status(200).json({ data: semesterCalendar, message: 'create calendar' });
    } catch (error) {
      next(error);
    }
  };

  public getCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calendar = await this.calendarService.getCalendar(true);
      res.status(200).json({ data: calendar, message: 'get calendar' });
    } catch (error) {
      next(error);
    }
  };

  public getCalendarName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calendar = await this.calendarService.getCalendar(false);
      res.status(200).json({ data: calendar, message: 'get calendar name' });
    } catch (error) {
      next(error);
    }
  };
}

export default CalendarController;
