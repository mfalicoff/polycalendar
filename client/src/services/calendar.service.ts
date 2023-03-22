import { DayInterface } from "@interfaces/calendar.interface";
import axios from "axios";

export const postCalendar = async (calendar: DayInterface[]): Promise<void> => {
    console.log(calendar);
    const result = await axios.post(`${process.env.ROUTE}/calendar/create`, {
        calendar: calendar,
    });
    console.log(result);
};
