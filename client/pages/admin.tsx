import React, { SyntheticEvent, useState } from "react";

import { Button, Container, Footer, Header, MainContent } from "@components";
import { postCalendar } from "../src/services/calendar.service";
import {
    DayInterface,
    ExchangeDayInterface,
    SemesterFormInterface,
} from "@interfaces/calendar.interface";
import { Center } from "@components/center";

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
                console.log("vacation");
                counter = 7;
            }

            if (counter !== 0) {
                singleDay.alt = "";
                singleDay.value = 0;
                counter--;
            }

            allDaysFormatted.push(singleDay);
        });
        console.log(allDaysFormatted);
        setCalendar(allDaysFormatted);
    };

    const sendCalendar = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(event);
        await postCalendar(calendar);
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

    const handleDateChange = (val = 0, date: string) => {
        console.log(val, date);
        const currentSemester = semesterForm;
        console.log(val, date);
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

    return (
        <Container>
            <Header />
            <MainContent>
                <div className="App">
                    <div className="flex mx-auto mt-8">
                        <div className="w-1/2">
                            <form>
                                <Center>
                                    <div className="flex">
                                        <div className="w-1/2">
                                            Start Date
                                            <Input
                                                onChange={handleDateChange}
                                                typeInput={"date"}
                                                index={0}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            End Date
                                            <Input
                                                onChange={handleDateChange}
                                                typeInput={"date"}
                                                index={1}
                                            />
                                        </div>
                                    </div>
                                    <div className="max-w-md mx-auto">
                                        <label>Vacation week</label>
                                        <Input
                                            onChange={handleVacationWeekChange}
                                            typeInput={"date"}
                                        />
                                    </div>
                                    <div>
                                        <Center>
                                            <h3>First week labs</h3>
                                            <div>
                                                <div>
                                                    <label className="px-3">Monday</label>
                                                    <Input
                                                        onChange={handleAltChange}
                                                        typeInput={"list"}
                                                        index={1}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="px-3">Tuesday</label>
                                                    <Input
                                                        onChange={handleAltChange}
                                                        typeInput={"datalist"}
                                                        index={2}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="px-3">Wednesday </label>
                                                    <Input
                                                        onChange={handleAltChange}
                                                        typeInput={"datalist"}
                                                        index={3}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="px-3">Thursday </label>
                                                    <Input
                                                        onChange={handleAltChange}
                                                        typeInput={"datalist"}
                                                        index={4}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="px-3">Friday </label>
                                                    <Input
                                                        onChange={handleAltChange}
                                                        typeInput={"datalist"}
                                                        index={5}
                                                    />
                                                </div>

                                                <datalist id=" alt">
                                                    <option value="B1" />
                                                    <option value="B2" />
                                                </datalist>
                                            </div>
                                        </Center>
                                    </div>
                                    <Center>
                                        <div>
                                            Additional days off
                                            <Button onClick={(event) => addFields(event)}>
                                                Add More..
                                            </Button>
                                        </div>
                                        {daysOff.map((input, index) => {
                                            return (
                                                <div>
                                                    <Input
                                                        onChange={handleDaysOffChange}
                                                        typeInput={"date"}
                                                        index={index}
                                                    />
                                                    <Button
                                                        onClick={(event) =>
                                                            removeFields(index, event)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </Center>
                                    <div>
                                        <Center>
                                            Exchange days
                                            <Button onClick={(event) => addFieldsDay(event)}>
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
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <Input
                                                            onChange={handleDayExchangeVal}
                                                            typeInput={"date"}
                                                            index={index}
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
                                                        onClick={(event) =>
                                                            removeFieldsDay(index, event)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="m-5">
                                        <Button onClick={(e) => submit(e)}>Submit</Button>
                                        <Button onClick={(e) => sendCalendar(e)}>Submit1</Button>
                                    </div>
                                </Center>
                            </form>
                        </div>
                        <div className="w-1/2">
                            <Center>
                                <Table data={calendar} pageSize={7} />
                            </Center>
                        </div>
                    </div>
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
            onChange={(e) =>
                index !== undefined ? onChange(index, e.target.value) : onChange(e.target.value)
            }
        />
    );
};

interface TableProps {
    data: DayInterface[];
    pageSize: number;
}

const Table: React.FC<TableProps> = ({ data, pageSize }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pagesCount = Math.ceil(data.length / pageSize);
    const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const tableData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                String
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Int
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((item, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.date.toDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.alt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`mx-2 px-3 py-1 rounded-lg bg-gray-300 text-gray-700"}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                >
                    previous
                </button>
                <button
                    className={`mx-2 px-3 py-1 rounded-lg bg-gray-300 text-gray-700"}`}
                    disabled={currentPage === pages[pages.length - 1]}
                    onClick={() => handlePageClick(currentPage + 1)}
                >
                    next
                </button>
            </div>
        </>
    );
};
