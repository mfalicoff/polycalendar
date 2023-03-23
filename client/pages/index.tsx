import React from "react";
import { ClassForm, Container, Footer, Header, Main, MainContent } from "@components";
import { ClassesTable } from "@components/forms/classForm";

const Home: React.FC = () => {
    return (
        <Container>
            <Header />
            <Main />
            <MainContent className="max-w-screen-lg">
                <ClassForm />
                <ClassesTable />
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;
