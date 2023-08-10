import { createSlice } from "@reduxjs/toolkit";
import { getState } from "../actions/accountAction";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    state: []
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
      .addCase(getState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.state = action?.payload?.data
      })
      .addCase(getState.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
