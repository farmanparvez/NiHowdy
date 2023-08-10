import { createSlice } from "@reduxjs/toolkit";
import { getRawTransaction } from "../actions/prescriptionHistoryAction";

const prescriptionHistory = createSlice({
    name: "prescriptionHistory",
    initialState: {
        isLoading: true,
        isSuccess: false,
        isError: false,
        RawTransactionDetails: [],
        pagination: { current: 1, pageSize: 10 },
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = null;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRawTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRawTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.RawTransactionDetails = action?.payload?.data;
                state.pagination = { ...state.pagination, totalCount: action.payload.totalCount };
            })
            .addCase(getRawTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
            });
    },
});

export const { reset, setPagination } = prescriptionHistory.actions;
export default prescriptionHistory.reducer;
