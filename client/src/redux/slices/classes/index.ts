import { createSlice } from "@reduxjs/toolkit";
import { Class } from "@interfaces/class.interface";

const classes: Class[] = [];

const classFormState = createSlice({
    name: "classes",
    initialState: classes,
    reducers: {
        classesPushClass: (state, action) => {
            const content = action.payload;
            state.push(content);
        },
        resetClassesStore: (state) => {
            while (state.length > 0) {
                state.pop();
            }
        },
    },
});
export const { classesPushClass, resetClassesStore } = classFormState.actions;

export default classFormState.reducer;
