import { createSlice } from "@reduxjs/toolkit";
import { qrAuth } from "../actions/qrAuthAction";
import { SAVINGCARDETAILS, EMAIL } from "../../utils/enviroment";

const qrSlice = createSlice({
    name: "qr",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(qrAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(qrAuth.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                localStorage.setItem(SAVINGCARDETAILS, JSON.stringify(action.payload.data))
                localStorage.setItem(EMAIL, action.payload.email)
                state.isSuccess = true
            })
            .addCase(qrAuth.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { reset } = qrSlice.actions;
export default qrSlice.reducer;
