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
import { RootState } from "@redux/reducers";

const Home: React.FC = () => {
    const classes = useSelector((state: RootState) => state.classesForm);

    const showClasses = () => {
        if (classes.length > 0)
            return (
                <div>
                    <h1>Cours selectionne</h1>
                    {classes.map((cours) => {
                        return <div key={cours._id}>{cours.name}</div>;
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
