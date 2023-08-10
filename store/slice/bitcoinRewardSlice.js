import { createSlice } from "@reduxjs/toolkit";
import { getUserBitcoinTotalRewardAmount, getwithDrawHistory, withDrawBitcoin } from "../actions/bitcoinReward";

const bitcoinReward = createSlice({
    name: "reward",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        reward: [],
        isVisible: false,
        isWithdrawHistoryLoading: false,
        isWithdrawLoading: false,
        WithdrawHistoryData: [],
        pagination: { current: 1, pageSize: 10 },

    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = null;
            state.reward = false;
        },
        setVisible: (state, action) => {
            state.isVisible = action.payload;
            // state.show = action.payload ? state.show : state.show = 1
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserBitcoinTotalRewardAmount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserBitcoinTotalRewardAmount.fulfilled, (state, action) => {
                state.reward = action.payload.totalamount
                state.isLoading = false;
            })
            .addCase(getUserBitcoinTotalRewardAmount.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getwithDrawHistory.pending, (state) => {
                state.isWithdrawHistoryLoading = true;
            })
            .addCase(getwithDrawHistory.fulfilled, (state, action) => {
                state.isWithdrawHistoryLoading = false;
                state.WithdrawHistoryData = action.payload?.data
                state.pagination = { ...state.pagination, totalCount: action.payload.totalCount };
            })
            .addCase(getwithDrawHistory.rejected, (state) => {
                state.isWithdrawHistoryLoading = false;
            })
            .addCase(withDrawBitcoin.pending, (state) => {
                state.isWithdrawLoading = true;
            })
            .addCase(withDrawBitcoin.fulfilled, (state, action) => {
                state.isWithdrawLoading = false;
                state.isVisible = false
            })
            .addCase(withDrawBitcoin.rejected, (state) => {
                state.isWithdrawLoading = false;
            })
    },
});

export const { reset, setVisible, setPagination } = bitcoinReward.actions;
export default bitcoinReward.reducer;
