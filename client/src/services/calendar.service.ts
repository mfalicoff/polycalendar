import { DayInterface } from "@interfaces/calendar.interface";
import axios from "axios";

export const postCalendar = async (
    calendar: DayInterface[],
    semesterName: string,
): Promise<void> => {
    const result = await axios.post(`${process.env.ROUTE}/calendar/create`, {
        name: semesterName,
        calendar: calendar,
    });
    console.log(result);
};
