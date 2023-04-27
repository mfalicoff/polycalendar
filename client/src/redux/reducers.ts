import { combineReducers } from "redux";

import classesPushClass from "@redux/slices/classes";
import changeUser from "@redux/slices/user";
import logout from "@redux/slices/user";

const rootReducer = combineReducers({
    classesForm: classesPushClass,
    storeUser: changeUser,
    logout: logout,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
