import React from "react";

import {
    ClassForm,
    Container,
    Footer,
    Header,
    Main,
    MainContent,
} from "@components";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    const classes = useSelector((state) => state.classesForm);

    const showClasses = () => {
        if (classes.length > 0)
            return (
                <div>
                    <h1>Cours selectionne</h1>
                    {classes.map((cour) => {
                        return <div key={cour._id}>{cour.name}</div>;
                    })}
                </div>
            );
        return <div></div>;
    };

    return (
        <Container>
            <Header />
            <Main />
            <MainContent>
                <ClassForm />
                <div>{showClasses()}</div>
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;
