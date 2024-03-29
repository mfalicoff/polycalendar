import axios from "axios";
import store from "../redux/store";
import { classesPushClass } from "@redux/actions";
import { Class, LabSection, TheorySection } from "@interfaces/class.interface";
import { classForm } from "@interfaces/classes.interface";
import { resetClassesStore } from "@redux/slices/classes";

export function instanceOfTheory(object: TheorySection | LabSection): object is TheorySection {
    return "theoryClassGroup" in object;
}

export function instanceOfLab(object: TheorySection | LabSection): object is LabSection {
    return "labClassGroup" in object;
}

export const fetchFormClasses = async (classesFromForm: classForm[]): Promise<void> => {
    try {
        classesFromForm = classesFromForm.sort((a, b) => a.classAcr.localeCompare(b.classAcr));
        const classesAcr = classesFromForm.map((classForm) => classForm.classAcr);
        const result = await axios.post(`${process.env.ROUTE}/class/manyName`, {
            classes: classesAcr,
        });

        const resultOrdered = result.data.data.sort((a: Class, b: Class) =>
            a.name.localeCompare(b.name),
        );

        resultOrdered.map((singleClass: Class, index: number) => {
            const schedulesT: TheorySection[] = [];
            const schedulesL: LabSection[] = [];
            singleClass.schedule.map((schedule) => {
                schedule.map((singleSchedule) => {
                    if (instanceOfTheory(singleSchedule)) {
                        if (
                            parseInt(singleSchedule.theoryClassGroup) ==
                            classesFromForm[index].theoryGroup
                        )
                            schedulesT.push(singleSchedule);
                    } else {
                        if (
                            parseInt(singleSchedule.labClassGroup) ==
                            classesFromForm[index].labGroup
                        )
                            schedulesL.push(singleSchedule);
                    }
                });
            });
            const combinesSchedules = [];
            combinesSchedules.push(schedulesT);
            combinesSchedules.push(schedulesL);
            singleClass.schedule = combinesSchedules;
            store.dispatch(classesPushClass(singleClass));
        });
    } catch (e) {
        console.log(e);
    }
};

export const resetClasses = (classes: Class[]): void => {
    if (classes.length > 0) {
        store.dispatch(resetClassesStore());
    }
};
