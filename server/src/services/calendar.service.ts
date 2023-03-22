import { calendarModel, dayModel } from '@models/calendar.model';

class calendarService {
  public calendar = calendarModel;
  public day = dayModel;

  public createCalendar = async (calendar: any[]) => {
    const objectIds: number[] = [];
    const promises: Promise<any>[] = [];

    for (const [key, day1] of Object.entries(calendar)) {
      console.log(key, day1);
      const createPromise = this.day.create({ date: day1.date, dayValue: day1.value, alternation: day1.alt });
      promises.push(createPromise);
    }

    const dateObjects = await Promise.all(promises);
    dateObjects.forEach(dateObj => objectIds.push(dateObj._id));
    const calendarObj = await this.calendar.create({ days: dateObjects });

    return calendarObj;
  };

  public async getCalendar(): Promise<any> {
    return this.calendar.find({}).populate('days');
  }
}

export default calendarService;
