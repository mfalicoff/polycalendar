import axios from "axios";
import store from "../redux/store";
import { classesPushClass } from "@redux/actions";

export const fetchFormClasses = async (classesAcr: string[]): Promise<void> => {
    try {
        const result = await axios.post(
            "http://localhost:3001/class/manyName",
            {
                classes: classesAcr,
            },
        );
        store.dispatch(classesPushClass(result.data.data));
    } catch (e) {
        console.log(e);
    }
};
