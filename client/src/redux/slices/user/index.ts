import { createSlice } from "@reduxjs/toolkit";

const user = {
    email: "",
    password: "",
    loggedIn: false,
};

const storeUser = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        changeUser: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.loggedIn = action.payload.loggedIn;
        },
        logout: (state) => {
            state.email = "";
            state.password = "";
            state.loggedIn = false;
        },
    },
});
export const { changeUser, logout } = storeUser.actions;

export default storeUser.reducer;
