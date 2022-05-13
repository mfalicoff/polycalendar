import { createSlice } from "@reduxjs/toolkit";
import { User } from "@interfaces/users.interface";

const user: User = { email: "", password: "", loggedIn: false };

const storeUser = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        changeUser: (state, action) => {
            state = action.payload;
            return state;
        },
        logout: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});
export const { changeUser, logout } = storeUser.actions;

export default storeUser.reducer;
