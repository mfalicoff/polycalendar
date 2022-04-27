import axios from "axios";

interface classForm extends Record<string, any> {
    classAcr: string;
    theoryGroup: number;
    labGroup?: number;
}

export const test = async (classesAcr: string[]): Promise<void> => {
    console.log(classesAcr);

    try {
        const result = await axios.post(
            "http://localhost:3001/class/manyName",
            {
                classes: classesAcr,
            },
        );
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};
