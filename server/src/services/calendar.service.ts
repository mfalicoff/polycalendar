import { calendarModel, dayModel } from '@models/calendar.model';
import { DayInterface } from '@interfaces/semester.interface';

class calendarService {
  public calendar = calendarModel;
  public day = dayModel;

  public createCalendar = async semester => {
    const calendar: DayInterface[] = semester.calendar;
    const semesterName: string = semester.name;

    const objectIds: number[] = [];
    const promises: Promise<any>[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, day1] of Object.entries(calendar)) {
      const createPromise = this.day.create({ date: day1.date, dayValue: day1.value, alternation: day1.alt });
      promises.push(createPromise);
    }

    const dateObjects = await Promise.all(promises);
    dateObjects.forEach(dateObj => objectIds.push(dateObj._id));
    return await this.calendar.create({ name: semesterName, days: dateObjects });
  };

  public async getCalendar(shouldPopulate: boolean): Promise<any> {
    return shouldPopulate ? this.calendar.find({}).populate('days') : this.calendar.find({});
  }
}

export default calendarService;
