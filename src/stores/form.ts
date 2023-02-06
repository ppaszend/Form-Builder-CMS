import {FormModel} from "@/models/Form.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import getFormById from "@/requests/forms/getFormById";

interface FormState {
    value: FormModel | null;
}

const initialState: FormState = {
    value: null,
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state, action: PayloadAction<FormModel>) => {
            state.value = action.payload;
        }
    }
});

export const { setForm } = formSlice.actions;

export const selectForm = (state: RootState) => state.form.value;

export default formSlice.reducer;