import axios from "axios";
import store from "../redux/store";
import { classesPushClass } from "@redux/actions";
import { Class } from "@interfaces/class.interface";

export const fetchFormClasses = async (classesAcr: string[]): Promise<void> => {
    try {
        const result = await axios.post(
            "http://localhost:3001/class/manyName",
            {
                classes: classesAcr,
            },
        );
        result.data.data.map((singleClass: Class) =>
            store.dispatch(classesPushClass(singleClass)),
        );
    } catch (e) {
        console.log(e);
    }
};
