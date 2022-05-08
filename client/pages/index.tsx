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
import { instanceOfLab, instanceOfTheory } from "../src/services/class.service";

const Home: React.FC = () => {
    const classes = useSelector((state: RootState) => state.classesForm);

    const showClasses = () => {
        if (classes.length > 0) {
            return (
                <div className="py-10 flex flex-col">
                    <h3 className="underline text-gray-500">
                        Cours selectionne(s)
                    </h3>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Cours
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Groupe Theorique
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Groupe Labo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classes.map((cours, index) => {
                                            let theoryGroup;
                                            let labGroup;
                                            if (
                                                instanceOfTheory(
                                                    cours.schedule[0][0],
                                                )
                                            )
                                                theoryGroup =
                                                    cours.schedule[0][0]
                                                        .theoryClassGroup;
                                            if (
                                                instanceOfLab(
                                                    cours.schedule[1][0],
                                                )
                                            )
                                                labGroup =
                                                    cours.schedule[1][0]
                                                        .labClassGroup;
                                            return (
                                                <tr
                                                    key={cours._id}
                                                    className="border-b"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {cours.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {theoryGroup}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {labGroup}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
