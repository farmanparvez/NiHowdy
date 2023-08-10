import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../actions/profileActions";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    profile: null
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
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action?.payload?.data
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
