import React, { SyntheticEvent } from "react";
import axios from "axios";
import { DayInterface, IcsEvent } from "@interfaces/calendar.interface";
import { Class, LabSection, TheorySection } from "@interfaces/class.interface";
import { createEvents, EventAttributes } from "ics";

interface DataFromServer {
    _id?: string;
    date: Date;
    dayValue: number;
    alternation: string;
}

export const CreateEvents = async (
    e: SyntheticEvent,
    setDays: React.Dispatch<React.SetStateAction<DayInterface[]>>,
    classes: Class[],
    setEvents: React.Dispatch<React.SetStateAction<IcsEvent[]>>,
): Promise<void> => {
    e.preventDefault();

    const result = await axios.get(`${process.env.ROUTE}/calendar`);

    const daysFormatted = result.data.data[0].days.map((day: DataFromServer) => {
        const newDay: DayInterface = {
            alt: day.alternation,
            date: new Date(day.date),
            value: day.dayValue,
        };
        return newDay;
    });

    setDays(daysFormatted);
    const events: IcsEvent[] = [];

    for (const day of daysFormatted) {
        if (day.value != 0) {
            for (let i = 0; i < classes.length; i++) {
                const theorySchedule = classes[i].schedule[0];
                const labSchedule = classes[i].schedule[1];

                for (let j = 0; j < theorySchedule.length; j++) {
                    const classTH: TheorySection = theorySchedule[j] as TheorySection;
                    if (dateMapper(classTH.theoryClassDate) === day.value) {
                        const dayOfClass = new Date(day.date);

                        let startTime = classTH.theoryClassTime.substring(
                            0,
                            classTH.theoryClassTime.indexOf(","),
                        );

                        if (classTH.theoryClassTime.length === 5)
                            startTime = classTH.theoryClassTime;

                        const startTimes = getStartTimes(startTime);

                        const dateStart = new Date(
                            dayOfClass.getFullYear(),
                            dayOfClass.getMonth(),
                            dayOfClass.getDate(),
                            parseInt(startTimes[0]),
                            parseInt(startTimes[1]),
                        );
                        let endTimes = ["", ""];
                        if (classTH.theoryClassTime.length !== 5) {
                            const endTime = classTH.theoryClassTime.substring(
                                classTH.theoryClassTime.lastIndexOf(",") + 2,
                                classTH.theoryClassTime.length,
                            );
                            endTimes = getEndTimes(endTime);
                        }
                        const dateEnd = new Date(
                            dayOfClass.getFullYear(),
                            dayOfClass.getMonth(),
                            dayOfClass.getDate(),
                            parseInt(endTimes[0]) + 1,
                            parseInt(endTimes[1]) - 10,
                        );
                        events.push(
                            createEvent(
                                dateStart,
                                dateEnd,
                                classes[i].name,
                                "TH",
                                classTH.theoryClassGroup,
                                classTH.theoryClassClassroom,
                            ),
                        );
                    }
                }
                for (let j = 0; j < labSchedule.length; j++) {
                    const labClass: LabSection = labSchedule[j] as LabSection;
                    if (dateMapper(labClass.labClassDate) === new Date(day.date).getDay()) {
                        const dayOfLab = new Date(day.date);
                        if (labClass.labClassTime.indexOf("(") === -1) {
                            const startTime = labClass.labClassTime.substring(
                                0,
                                labClass.labClassTime.indexOf(","),
                            );
                            const labDates = createLabDates(dayOfLab, labClass, startTime, false);

                            events.push(
                                createEvent(
                                    labDates.dateStart,
                                    labDates.dateEnd,
                                    classes[i].name,
                                    "TP",
                                    labClass.labClassGroup,
                                    labClass.labClassClassroom,
                                ),
                            );
                        } else {
                            const alt = labClass.labClassTime.substring(
                                labClass.labClassTime.indexOf("(") + 1,
                                labClass.labClassTime.length - 1,
                            );

                            if (alt.toString() === day.alt.toString()) {
                                const startTime = labClass.labClassTime.substring(
                                    0,
                                    labClass.labClassTime.indexOf(","),
                                );

                                const labDates = createLabDates(
                                    dayOfLab,
                                    labClass,
                                    startTime,
                                    true,
                                );
                                events.push(
                                    createEvent(
                                        labDates.dateStart,
                                        labDates.dateEnd,
                                        classes[i].name,
                                        "TP",
                                        labClass.labClassGroup,
                                        labClass.labClassClassroom,
                                    ),
                                );
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(events);
    setEvents(events);
};

const createLabDates = (
    dayOfLab: Date,
    labClass: LabSection,
    startTime: string,
    shouldTruncate: boolean,
) => {
    if (labClass.labClassTime.length === 5) {
        startTime = labClass.labClassTime;
    }
    const startTimes = getStartTimes(startTime);

    const dateStart = new Date(
        dayOfLab.getFullYear(),
        dayOfLab.getMonth(),
        dayOfLab.getDate(),
        parseInt(startTimes[0]),
        parseInt(startTimes[1]),
    );

    let endTimes = ["", ""];
    if (labClass.labClassTime.length !== 5) {
        const endTime = labClass.labClassTime.substring(
            labClass.labClassTime.lastIndexOf(",") + 2,
            labClass.labClassTime.length,
        );
        endTimes = getEndTimes(endTime);
    }
    let minutesEnd = endTimes[1];
    if (shouldTruncate) minutesEnd = endTimes[1].slice(0, endTimes[1].indexOf("("));

    const dateEnd = new Date(
        dayOfLab.getFullYear(),
        dayOfLab.getMonth(),
        dayOfLab.getDate(),
        parseInt(endTimes[0]) + 1,
        parseInt(minutesEnd) - 10,
    );
    return {
        dateStart: dateStart,
        dateEnd: dateEnd,
    };
};

export const downloadIcsFile = async (e: SyntheticEvent, events: IcsEvent[]): Promise<void> => {
    e.preventDefault();

    const filename = "ExampleEvent.ics";
    const file = await new Promise((resolve, reject) => {
        createEvents(events as EventAttributes[], (error, value) => {
            if (error) {
                reject(error);
                console.log(value);
            }

            resolve(new File([value], filename, { type: "plain/text" }));
        });
    });
    const url = URL.createObjectURL(file as MediaSource);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
};

const getStartTimes = (startTime: string): string[] => {
    const indexHourStart = startTime.indexOf("h");
    let hoursStart = "";
    for (let o = 0; o < indexHourStart; o++) {
        hoursStart = hoursStart + startTime[o];
    }
    let minuteStart = "";
    for (let o = indexHourStart + 1; o < startTime.length; o++) {
        minuteStart = minuteStart + startTime[o];
    }

    return [hoursStart, minuteStart];
};

const getEndTimes = (endTime: string): string[] => {
    let hoursEnd = "";
    let minutesEnd = "";
    const indexHourEnd = endTime.indexOf("h");
    for (let o = 0; o < indexHourEnd; o++) {
        hoursEnd = hoursEnd + endTime[o];
    }
    for (let o = indexHourEnd + 1; o < endTime.length; o++) {
        minutesEnd = minutesEnd + endTime[o];
    }

    return [hoursEnd, minutesEnd];
};

const createEvent = (
    dateStart: Date,
    dateEnd: Date,
    className: string,
    typeOfClass: string,
    group: string,
    classRoom: string,
) => {
    return {
        start: [
            dateStart.getFullYear(),
            dateStart.getMonth() + 1,
            dateStart.getDate(),
            dateStart.getHours(),
            dateStart.getMinutes(),
        ],
        end: [
            dateEnd.getFullYear(),
            dateEnd.getMonth() + 1,
            dateEnd.getDate(),
            dateEnd.getHours(),
            dateEnd.getMinutes(),
        ],
        title: `${className} ${typeOfClass}`,
        description: `Groupe ${group}, ${classRoom}`,
        location: "2500 Chem. de Polytechnique, Montréal, QC H3T 1J4",
    };
};

const dateMapper = (dateInFrench: string) => {
    if (dateInFrench === "Dimanche") {
        return 0;
    }
    if (dateInFrench === "Lundi") {
        return 1;
    }
    if (dateInFrench === "Mardi") {
        return 2;
    }
    if (dateInFrench === "Mercredi") {
        return 3;
    }
    if (dateInFrench === "Jeudi") {
        return 4;
    }
    if (dateInFrench === "Vendredi") {
        return 5;
    }
    if (dateInFrench === "Samedi") {
        return 0;
    }
};
