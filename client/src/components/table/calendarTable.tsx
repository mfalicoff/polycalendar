import React, { useState } from "react";
import { DayInterface } from "@interfaces/calendar.interface";
import { Button } from "@components";

interface TableProps {
    data: DayInterface[];
    pageSize: number;
}

export const CalendarTable: React.FC<TableProps> = ({ data, pageSize }) => {
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
