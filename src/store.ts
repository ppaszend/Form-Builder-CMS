import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import formReducer from './stores/form';
import userReducer from './stores/user'
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            form: formReducer,
            user: userReducer
        },
        devTools: true
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;

export const wrapper = createWrapper<AppStore>(makeStore);
