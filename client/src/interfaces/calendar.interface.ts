/*eslint-disable */ // use for any in interface

export interface SemesterFormInterface extends Record<string, any> {
    name: string;
    dates: Date[];
    vacationWeekStart: Date;
    alt: string[];
    daysOff: Date[];
}

export interface DayInterface extends Record<string, any> {
    date: Date;
    alt: string;
    value: number;
}

export interface CalendarInterface extends Record<string, any> {
    dates: DayInterface[];
}

export interface ExchangeDayInterface extends Record<string, any> {
    dayToExchange: Date;
    valueReplace: number;
}

export interface IcsEvent {
    start: number[];
    end: number[];
    title: string;
    location: string;
    description: string;
}
