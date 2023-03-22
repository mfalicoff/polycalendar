import { DayInterface } from "@interfaces/calendar.interface";

export const postCalendar = async (calendar: DayInterface[]): Promise<void> => {
    console.log(calendar);
};
