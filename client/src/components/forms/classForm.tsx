import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button } from "@components";
import {
    fetchFormClasses,
    instanceOfLab,
    instanceOfTheory,
} from "../../services/class.service";
import { classForm } from "@interfaces/classes.interface";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { Class } from "@interfaces/class.interface";

export const ClassForm: React.FC = () => {
    const [classFields, setClassFields] = useState<classForm[]>([
        { classAcr: "", theoryGroup: 0, labGroup: 0 },
    ]);

    const handleFormChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const data = [...classFields];
        data[index][event.target.name] = event.target.value;
        setClassFields(data);
    };

    const addFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newField: classForm = {
            classAcr: "",
            theoryGroup: 0,
            labGroup: 0,
        };
        setClassFields([...classFields, newField]);
    };

    const removeFields = (
        index: number,
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        const data = [...classFields];
        data.splice(index, 1);
        setClassFields(data);
    };

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault();
        await fetchFormClasses(classFields);
    };

    return (
        <div className="App">
            <form onSubmit={submit}>
                <div>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Sigle du cours"
                        readOnly
                    />
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Groupe Theorique"
                        readOnly
                    />
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="labGroup"
                        placeholder="Groupe de Lab"
                        readOnly
                    />
                </div>
                {classFields.map((input, index) => {
                    return (
                        <div key={index} className="py-3">
                            <ClassFormInput
                                name="classAcr"
                                placeholder="Sigle du Cours"
                                value={input.classAcr}
                                onChange={handleFormChange}
                                index={index}
                            />
                            <ClassFormInput
                                name="theoryGroup"
                                placeholder="Groupe Theorique"
                                value={input.theoryGroup}
                                onChange={handleFormChange}
                                index={index}
                            />
                            <ClassFormInput
                                name="labGroup"
                                placeholder="Groupe de Lab"
                                value={input.labGroup}
                                onChange={handleFormChange}
                                index={index}
                            />
                            <Button
                                onClick={(event) => removeFields(index, event)}
                            >
                                Remove
                            </Button>
                        </div>
                    );
                })}
                <Button onClick={(event) => addFields(event)}>
                    Add More..
                </Button>
                <Button
                    onClick={(event) => submit(event)}
                    disabled={classFields.length < 1}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
/*eslint-disable */ //for any for function
interface InputProps {
    name: string;
    placeholder: string;
    value: string | number | undefined;
    onChange: any;
    index: number;
}
/*eslint-enable */

const ClassFormInput: React.FC<InputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    index,
}) => {
    return (
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(index, event)}
        />
    );
};

export const ClassesTable: React.FC = () => {
    const classes = useSelector((state: RootState) => state.classesForm);

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
                                    {classes.map((cours: Class, index) => {
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
                                        if (instanceOfLab(cours.schedule[1][0]))
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
