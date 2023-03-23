import React, { SyntheticEvent, useState } from "react";
import { Button, Center, Input } from "@components";
import {
    DayInterface,
    ExchangeDayInterface,
    SemesterFormInterface,
} from "@interfaces/calendar.interface";
import { postCalendar } from "../../services/calendar.service";

interface CalendarProps {
    calendar: DayInterface[];
    setCalendar: React.Dispatch<React.SetStateAction<DayInterface[]>>;
}

export const CalendarForm: React.FC<CalendarProps> = ({ calendar, setCalendar }) => {
    const initialSemesterForm: SemesterFormInterface = {
        name: "",
        alt: [],
        dates: [],
        daysOff: [],
        vacationWeekStart: new Date(0),
    };

    const [semesterForm, setSemesterForm] = useState<SemesterFormInterface>(initialSemesterForm);
    const [daysOff, setDaysOff] = useState<Date[]>([]);
    const [daysToChangeValue, setDaysToChangeValue] = useState<ExchangeDayInterface[]>([]);

    const addDay = (date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const getDatesBetweenDates = (startDate: Date, stopDate: Date) => {
        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDay(currentDate, 1);
        }
        return dateArray;
    };

    const getLastAlt = (
        day: DayInterface,
        currentCalendar: DayInterface[],
        index: number,
        originalIndex: number,
    ): string => {
        if (day.date.getDay() % 6 === 0) {
            return "";
        }

        for (const elem of semesterForm.daysOff) {
            if (elem.toDateString() === day.date.toDateString()) {
                return "";
            }
        }

        if (originalIndex <= 6) {
            return semesterForm.alt[index % 6];
        }
        const elemLastWeek = currentCalendar[index - 1];
        if (elemLastWeek) {
            if (elemLastWeek.value === day.value) {
                if (elemLastWeek.alt === "B1") {
                    return "B2";
                } else if (elemLastWeek.alt === "B2") {
                    return "B1";
                } else {
                    return getLastAlt(day, currentCalendar, index - 1, originalIndex);
                }
            }
            return getLastAlt(day, currentCalendar, index - 1, originalIndex);
        }
        return "";
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        const allDaysInSemester = getDatesBetweenDates(
            addDay(semesterForm.dates[0], 1),
            addDay(semesterForm.dates[1], 1),
        );
        const allDaysFormatted: DayInterface[] = [];
        let counter = 0;
        allDaysInSemester.map((elem, index) => {
            const singleDay: DayInterface = {
                date: elem,
                alt: "",
                value: elem.getDay() % 6,
            };
            for (const day of daysToChangeValue) {
                if (elem.toDateString() === day.dayToExchange.toDateString()) {
                    singleDay.value = day.valueReplace;
                }
            }
            singleDay.alt = getLastAlt(singleDay, allDaysFormatted, index, index);

            if (elem.getTime() === semesterForm.vacationWeekStart.getTime()) {
                counter = 7;
            }

            if (counter !== 0) {
                singleDay.alt = "";
                singleDay.value = 0;
                counter--;
            }

            allDaysFormatted.push(singleDay);
        });
        setCalendar(allDaysFormatted);
    };

    const sendCalendar = async (event: SyntheticEvent) => {
        event.preventDefault();
        await postCalendar(calendar);
    };

    const addFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setDaysOff([...daysOff, new Date()]);
    };

    const addFieldsDayExchange = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setDaysToChangeValue([
            ...daysToChangeValue,
            {
                dayToExchange: new Date(),
                valueReplace: 0,
            },
        ]);
    };

    const removeFields = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const object = daysOff[index];

        let data = [...daysOff];
        data.splice(index, 1);
        setDaysOff(data);

        const currentForm = semesterForm;
        data = [...currentForm.daysOff];
        data.splice(currentForm.daysOff.indexOf(object));
        currentForm.daysOff = data;
        setSemesterForm(currentForm);
    };

    const removeFieldsDayExchange = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const data = [...daysToChangeValue];
        data.splice(index, 1);
        setDaysToChangeValue(data);
    };

    const handleDateChange = (val = 0, date: string) => {
        const currentSemester = semesterForm;
        if (semesterForm.dates[val]) {
            semesterForm.dates[val] = new Date(date);
        } else {
            semesterForm.dates.push(new Date(date));
        }
        setSemesterForm(currentSemester);
    };

    const handleAltChange = (day: number, val: string) => {
        const currentForm = semesterForm;
        currentForm.alt[day - 1] = val.toUpperCase();
        setSemesterForm(currentForm);
    };

    const handleVacationWeekChange = (startDate: string) => {
        const currentForm = semesterForm;
        currentForm.vacationWeekStart = new Date(startDate);
        setSemesterForm(currentForm);
    };

    const handleDaysOffChange = (index: number, dayOff: string) => {
        const currentForm = semesterForm;
        currentForm.daysOff[index] = addDay(new Date(dayOff), 1);
        setSemesterForm(currentForm);
    };

    const handleDayExchange = (index: number, date: string) => {
        const currentDays = daysToChangeValue;
        const dateCorr = addDay(new Date(date), 1);
        daysToChangeValue[index] = {
            dayToExchange: new Date(dateCorr),
            valueReplace: 0,
        };
        setDaysToChangeValue(currentDays);
    };

    const handleDayExchangeVal = (index: number, val: number) => {
        const currentDays = daysToChangeValue;
        daysToChangeValue[index].valueReplace = val;
        setDaysToChangeValue(currentDays);
    };

    const changeSemesterName = (val: string) => {
        const currentForm = semesterForm;
        currentForm.name = val;
        setSemesterForm(currentForm);
    };

    return (
        <form onChange={(e) => (semesterForm.dates[1] === undefined ? void 0 : submit(e))}>
            <Center className="flex max-w-full">
                <div className="w-1/3 p-4">
                    <label>Semester Name</label>
                    <Input className="ml-5" onChange={changeSemesterName} typeInput={"text"} />
                    <div className="flex mt-5">
                        <div className="w-1/2">
                            Start Date
                            <Input onChange={handleDateChange} typeInput={"date"} index={0} />
                        </div>
                        <div className="w-1/2">
                            End Date
                            <Input onChange={handleDateChange} typeInput={"date"} index={1} />
                        </div>
                    </div>
                    <div className="max-w-md mx-auto pt-5">
                        <label>Vacation week</label>
                        <Input
                            className="ml-5"
                            onChange={handleVacationWeekChange}
                            typeInput={"date"}
                        />
                    </div>
                    <Center>
                        <div>
                            Additional days off
                            <Button onClick={(event) => addFields(event)}>Add More..</Button>
                        </div>
                        {daysOff.map((input, index) => {
                            return (
                                <div>
                                    <Input
                                        onChange={handleDaysOffChange}
                                        typeInput={"date"}
                                        index={index}
                                        className="mt-5"
                                    />
                                    <Button onClick={(event) => removeFields(index, event)}>
                                        Remove
                                    </Button>
                                </div>
                            );
                        })}
                    </Center>
                    <div>
                        <Center>
                            Exchange days
                            <Button
                                className="ml-9"
                                onClick={(event) => addFieldsDayExchange(event)}
                            >
                                Add More..
                            </Button>
                        </Center>
                        {daysToChangeValue.map((input, index) => {
                            return (
                                <div className="flex">
                                    <div className="w-1/2">
                                        <Input
                                            onChange={handleDayExchange}
                                            typeInput={"date"}
                                            index={index}
                                            className="mt-5"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Input
                                            onChange={handleDayExchangeVal}
                                            typeInput={"date"}
                                            index={index}
                                            className="mt-5"
                                        />
                                    </div>
                                    <datalist id="days">
                                        <option value={1} />
                                        <option value={2} />
                                        <option value={3} />
                                        <option value={4} />
                                        <option value={5} />
                                    </datalist>
                                    <Button
                                        className="mt-5"
                                        onClick={(event) => removeFieldsDayExchange(index, event)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="w-1/3 p-4">
                    <Center className="mt-0">
                        <h3>First week labs</h3>
                        <div>
                            <div>
                                <label className="px-3">Monday</label>
                                <Input
                                    onChange={handleAltChange}
                                    typeInput={"list"}
                                    index={1}
                                    className="ml-12"
                                />
                            </div>
                            <div>
                                <label className="px-3">Tuesday</label>
                                <Input
                                    onChange={handleAltChange}
                                    typeInput={"datalist"}
                                    index={2}
                                    className="ml-11"
                                />
                            </div>
                            <div>
                                <label className="px-3">Wednesday </label>
                                <Input
                                    onChange={handleAltChange}
                                    typeInput={"datalist"}
                                    index={3}
                                    className="ml-4"
                                />
                            </div>
                            <div>
                                <label className="px-3">Thursday </label>
                                <Input
                                    onChange={handleAltChange}
                                    typeInput={"datalist"}
                                    index={4}
                                    className="ml-8"
                                />
                            </div>
                            <div>
                                <label className="px-3">Friday </label>
                                <Input
                                    onChange={handleAltChange}
                                    typeInput={"datalist"}
                                    index={5}
                                    className="ml-14"
                                />
                            </div>

                            <datalist id=" alt">
                                <option value="B1" />
                                <option value="B2" />
                            </datalist>
                        </div>
                    </Center>
                </div>
                <div className="m-5">
                    <Button
                        disabled={semesterForm.dates[1] === undefined}
                        onClick={(e) => sendCalendar(e)}
                    >
                        Submit
                    </Button>
                </div>
            </Center>
        </form>
    );
};
