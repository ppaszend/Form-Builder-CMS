import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import formReducer from './stores/form';
import userReducer from './stores/user';
import LoadingReducer from './stores/loading';
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            form: formReducer,
            user: userReducer,
            loading: LoadingReducer,
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
