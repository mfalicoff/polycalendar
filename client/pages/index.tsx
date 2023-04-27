import React, { useEffect, useState } from "react";
import {
    Button,
    Center,
    ClassForm,
    Container,
    Footer,
    Header,
    Main,
    MainContent,
} from "@components";
import { ClassesTable } from "@components/forms/classForm";
import { CalendarTable } from "@components/table/calendarTable";
import { DayInterface, IcsEvent } from "@interfaces/calendar.interface";
import { CreateEvents, downloadIcsFile } from "../src/services/ics.service";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import axios from "axios";

const Home: React.FC = () => {
    const [days, setDays] = useState<DayInterface[]>([]);
    const [events, setEvents] = useState<IcsEvent[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [semesterName, setSemesterName] = useState("");

    const classes = useSelector((state: RootState) => state.classesForm);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${process.env.ROUTE}/calendar/name`);
            setSemesterName(result.data.data[0].name);
        };

        fetchData().catch(console.error);
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Container>
            <Header />
            <Main />
            <MainContent className="max-w-screen-lg">
                <Center>
                    <h1 className="py-4 text-lg mb-3"> Session {semesterName}</h1>
                </Center>
                <ClassForm />
                <ClassesTable />
                <Button
                    disabled={classes.length === 0}
                    className="m-2"
                    onClick={(e) => {
                        CreateEvents(e, setDays, classes, setEvents).then(() => {
                            toggleModal();
                        });
                    }}
                >
                    Create Calendar
                </Button>
                {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                                onClick={toggleModal}
                            ></div>

                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
                                <div
                                    className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-auto"
                                    style={{ width: "70vw", height: "70vh" }}
                                >
                                    <CalendarTable
                                        data={days}
                                        pageSize={7}
                                        events={events}
                                    ></CalendarTable>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button
                                        type="button"
                                        onClick={(e) => downloadIcsFile(e, events, semesterName)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M20 14V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V14M12 15L12 3M12 15L8 11M12 15L16 11"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Download ICS
                                    </Button>

                                    <Button className="m-2" onClick={toggleModal}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;
