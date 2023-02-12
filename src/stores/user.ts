import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/store";
import UserModel from "@/models/User.model";
import {getCookie, setCookie} from "cookies-next";

const TOKEN_COOKIE_ID = 'authToken'

interface UserState {
    data: UserModel | null;
    token: string | null;
}

const initialState: UserState = {
    data: null,
    token: ((): string | null => {
        const authCookie = getCookie(TOKEN_COOKIE_ID);
        if (typeof authCookie === "string") {
            return authCookie;
        }
        return null;
    })()
};

export const userSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState['data']>) {
            state.data = action.payload;
        },
        setToken(state, action: PayloadAction<UserState['token']>) {
            setCookie(TOKEN_COOKIE_ID, action.payload);
            state.token = action.payload;
        }
    }
});

export const { setUser, setToken } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;