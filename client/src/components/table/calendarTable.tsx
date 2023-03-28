import React, { useState } from "react";
import { DayInterface, IcsEvent } from "@interfaces/calendar.interface";
import { Button } from "@components";

interface TableProps {
    data: DayInterface[];
    pageSize: number;
    events?: IcsEvent[];
}

export const CalendarTable: React.FC<TableProps> = ({ data, pageSize, events }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pagesCount = Math.ceil(data.length / pageSize);
    const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const tableData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const eventsIsSameDay = (event: IcsEvent, day: DayInterface) => {
        return (
            day.date.getFullYear() === event.start[0] &&
            day.date.getMonth() === event.start[1] - 1 &&
            day.date.getDate() === event.start[2]
        );
    };

    const formatTime = (event: IcsEvent) => {
        return `${event.start[3]}h:${event.start[4]} - ${event.end[3]}h:${event.end[4]}`;
    };

    let sortedEvents: IcsEvent[] = [];

    if (events) {
        sortedEvents = events.sort((a, b) => {
            const dateA = new Date(a.start[0], a.start[1], a.start[2], a.start[3]);
            const dateB = new Date(b.start[0], b.start[1], b.start[2], b.start[3]);

            return dateA.getTime() - dateB.getTime();
        });
    }

    return (
        <>
            <div className="w-full overflow-x-auto">
                <h1>{}</h1>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Alt
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((item, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.date.toDateString()}
                                    {sortedEvents.map((event) => {
                                        if (eventsIsSameDay(event, item)) {
                                            return (
                                                <div>
                                                    <h6 key={1} className="text-sm">
                                                        {event.title}
                                                    </h6>
                                                    <h6 className="pl-2 text-xs">
                                                        {formatTime(event)}
                                                    </h6>
                                                </div>
                                            );
                                        }
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.alt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tableData.length > 0 ? (
                <div className="flex justify-center items-center mt-4">
                    <Button
                        className={`mx-2 px-3 py-1 rounded-lg bg-gray-300 text-gray-700"}`}
                        disabled={currentPage === 1}
                        onClick={() => handlePageClick(currentPage - 1)}
                    >
                        &larr;
                    </Button>
                    <Button
                        className={`mx-2 px-3 py-1 rounded-lg bg-gray-300 text-gray-700"}`}
                        disabled={currentPage === pages[pages.length - 1]}
                        onClick={() => handlePageClick(currentPage + 1)}
                    >
                        &rarr;
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
