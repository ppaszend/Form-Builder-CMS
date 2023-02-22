import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/store";

interface LoadingState {
    value: boolean;
}

const initialState: LoadingState = {
    value: true
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingValue(state, action: PayloadAction<LoadingState['value']>) {
            state.value = action.payload;
        },
    }
});

export const { setLoadingValue } = loadingSlice.actions;

export const selectLoadingState = (state: AppState) => state.loading;

export default loadingSlice.reducer;