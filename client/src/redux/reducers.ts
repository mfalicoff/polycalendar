import { combineReducers } from "redux";

import classesPushClass from "@redux/slices/classes";

const rootReducer = combineReducers({ classesForm: classesPushClass });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
