import React, { useState } from "react";

import { Container, Footer, Header, MainContent } from "@components";
import { DayInterface } from "@interfaces/calendar.interface";
import { Center } from "@components/center";
import { CalendarForm } from "@components/forms/calendarForm";
import { CalendarTable } from "@components/table/calendarTable";

const Home: React.FC = () => {
    const [calendar, setCalendar] = useState<DayInterface[]>([]);

    return (
        <Container>
            <Header />
            <MainContent>
                <div className="App">
                    <div className="flex mx-auto mt-8">
                        <div className="w-2/3 pl-40">
                            <CalendarForm
                                calendar={calendar}
                                setCalendar={setCalendar}
                            ></CalendarForm>
                        </div>
                        <div className="w-1/3 pr-40">
                            <Center>
                                <CalendarTable data={calendar} pageSize={7} />
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
