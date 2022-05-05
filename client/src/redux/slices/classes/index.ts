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
    },
});
export const { classesPushClass } = classFormState.actions;

export default classFormState.reducer;
