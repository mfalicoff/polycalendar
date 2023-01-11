import React, { SyntheticEvent, useState } from "react";

import { Button, Container, Footer, Header, MainContent } from "@components";

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

interface ExchangeDayInterface extends Record<string, any> {
    dayToExchange: Date;
    valueReplace: number;
}

/*eslint-enable */ // use for any in interface

const Home: React.FC = () => {
    const initialSemesterForm: SemesterFormInterface = {
        name: "",
        alt: [],
        dates: [],
        daysOff: [],
        vacationWeekStart: new Date(),
    };

    const [semesterForm, setSemesterForm] = useState<SemesterFormInterface>(initialSemesterForm);
    const [calendar, setCalendar] = useState<DayInterface[]>([]);
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
                counter--;
            }

            allDaysFormatted.push(singleDay);
        });
        setCalendar(allDaysFormatted);
    };

    const addFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setDaysOff([...daysOff, new Date()]);
    };

    const addFieldsDay = (event: React.MouseEvent<HTMLButtonElement>) => {
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

    const removeFieldsDay = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const data = [...daysToChangeValue];
        data.splice(index, 1);
        setDaysToChangeValue(data);
    };

    const handleDateChange = (val: number, date: string) => {
        const currentSemester = semesterForm;
        if (semesterForm.dates[val]) {
            semesterForm.dates[val] = new Date(date);
        } else {
            semesterForm.dates.push(new Date(date));
        }
        setSemesterForm(currentSemester);
    };

    const handleAltChange = (day: number, val: string) => {
        console.log(day, val);
        const currentForm = semesterForm;
        currentForm.alt[day - 1] = val;
        setSemesterForm(currentForm);
    };

    const handleVacationWeekChange = (startDate: string) => {
        const currentForm = semesterForm;
        currentForm.vacationWeekStart = new Date(startDate);
        setSemesterForm(currentForm);
    };

    const handleDaysOffChange = (index: number, dayOff: string) => {
        const currentForm = semesterForm;
        const date = addDay(new Date(dayOff), 1);
        currentForm.daysOff[index] = date;
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

    return (
        <Container>
            <Header />
            <MainContent>
                <div className="App">
                    <form>
                        <div>
                            Start Date
                            <Input onChange={handleDateChange} typeInput={"date"} index={0} />
                            End Date
                            <Input onChange={handleDateChange} typeInput={"date"} index={1} />
                        </div>
                        <div>
                            Vacation week
                            <Input onChange={handleVacationWeekChange} typeInput={"date"} />
                        </div>
                        <div>
                            <h3>First week labs</h3>
                            <div>
                                Monday{" "}
                                <Input onChange={handleAltChange} typeInput={"date"} index={1} />
                                Tuesday{" "}
                                <Input onChange={handleAltChange} typeInput={"date"} index={2} />
                                Wednesday{" "}
                                <Input onChange={handleAltChange} typeInput={"date"} index={3} />
                                Thursday{" "}
                                <Input onChange={handleAltChange} typeInput={"date"} index={4} />
                                Friday{" "}
                                <Input onChange={handleAltChange} typeInput={"date"} index={5} />
                                <datalist id="alt">
                                    <option value="B1" />
                                    <option value="B2" />
                                </datalist>
                            </div>
                        </div>
                        <div>
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
                                        />
                                        <Button onClick={(event) => removeFields(index, event)}>
                                            Remove
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <div>
                                Exchange days
                                <Button onClick={(event) => addFieldsDay(event)}>Add More..</Button>
                            </div>
                            {daysToChangeValue.map((input, index) => {
                                return (
                                    <div>
                                        <Input
                                            onChange={handleDayExchange}
                                            typeInput={"date"}
                                            index={index}
                                        />
                                        <Input
                                            onChange={handleDayExchangeVal}
                                            typeInput={"date"}
                                            index={index}
                                        />
                                        <datalist id="days">
                                            <option value={1} />
                                            <option value={2} />
                                            <option value={3} />
                                            <option value={4} />
                                            <option value={5} />
                                        </datalist>
                                        <Button onClick={(event) => removeFieldsDay(index, event)}>
                                            Remove
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        <Button onClick={(e) => submit(e)}>Submit</Button>
                    </form>
                </div>

                <div>
                    {calendar.map((elem: DayInterface, index: number) => {
                        const formated = `${elem.date.toDateString()} ${elem.alt} ${elem.value}`;
                        return <div key={index}>{formated}</div>;
                    })}
                </div>
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;

/*eslint-disable */ // use for any in interface
interface InputProps {
    className?: string;
    onChange: any;
    typeInput: string;
    index?: number;
}

/*eslint-enable */ // use for any in interface

const Input: React.FC<InputProps> = ({ className = "", typeInput = "", onChange, index }) => {
    return (
        <input
            className={`m-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            type={typeInput}
            onChange={(e) => (index ? onChange(index, e.target.value) : onChange(e.target.value))}
        />
    );
};
