import React, { useState } from "react";
import { Button, ClassForm, Container, Footer, Header, Main, MainContent } from "@components";
import { ClassesTable } from "@components/forms/classForm";
import { CalendarTable } from "@components/table/calendarTable";
import { DayInterface, IcsEvent } from "@interfaces/calendar.interface";
import { CreateEvents, downloadIcsFile } from "../src/services/ics.service";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

const Home: React.FC = () => {
    const [days, setDays] = useState<DayInterface[]>([]);
    const [events, setEvents] = useState<IcsEvent[]>([]);
    const classes = useSelector((state: RootState) => state.classesForm);

    return (
        <Container>
            <Header />
            <Main />
            <MainContent className="max-w-screen-lg">
                <ClassForm />
                <ClassesTable />
                <Button onClick={(e) => CreateEvents(e, setDays, classes, setEvents)}>
                    Create Calendar
                </Button>
                <CalendarTable data={days} pageSize={7} events={events}></CalendarTable>
                <Button onClick={(e) => downloadIcsFile(e, events)}></Button>
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;
