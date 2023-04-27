import { DayInterface } from "@interfaces/calendar.interface";
import axios from "axios";
import { SyntheticEvent } from "react";

export const ScrapeClasses = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await axios.post(
        `${process.env.ROUTE}/class/scrape`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
        },
    );
    console.log(result);
};
export const postCalendar = async (
    calendar: DayInterface[],
    semesterName: string,
): Promise<void> => {
    const result = await axios.post(
        `${process.env.ROUTE}/calendar/create`,
        {
            name: semesterName,
            calendar: calendar,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
        },
    );
    console.log(result);
};
