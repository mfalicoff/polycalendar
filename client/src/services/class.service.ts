import axios from "axios";
import store from "../redux/store";
import { classesPushClass } from "@redux/actions";
import { Class, LabSection, TheorySection } from "@interfaces/class.interface";
import { classForm } from "@interfaces/classes.interface";

export function instanceOfTheory(
    object: TheorySection | LabSection,
): object is TheorySection {
    return "theoryClassGroup" in object;
}

export function instanceOfLab(
    object: TheorySection | LabSection,
): object is LabSection {
    return "labClassGroup" in object;
}

export const fetchFormClasses = async (
    classesFromForm: classForm[],
): Promise<void> => {
    try {
        const classesAcr = classesFromForm.map(
            (classForm) => classForm.classAcr,
        );
        const result = await axios.post(
            "http://localhost:3001/class/manyName",
            {
                classes: classesAcr,
            },
        );
        result.data.data.map((singleClass: Class, index: number) => {
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
