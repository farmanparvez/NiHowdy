
import { createSlice } from "@reduxjs/toolkit";
import { getProfileSavingCard, sendEmailSavingCard } from "../actions/savingCard";

const profileSavingCard = createSlice({
  name: "savingCard",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    profile: null,
    profileSavingCardDetail: [],
    isLoadingEmailSavingCard: false
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
      state.isLoadingEmailSavingCard = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileSavingCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileSavingCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileSavingCardDetail = action?.payload?.data
      })
      .addCase(getProfileSavingCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true
      })
      .addCase(sendEmailSavingCard.pending, (state) => {
        state.isLoadingEmailSavingCard = true;
      })
      .addCase(sendEmailSavingCard.fulfilled, (state, action) => {
        state.isLoadingEmailSavingCard = false;
      })
      .addCase(sendEmailSavingCard.rejected, (state, action) => {
        state.isLoadingEmailSavingCard = false;
        // state.isError = true
      })
  },
});

export const { reset } = profileSavingCard.actions;
export default profileSavingCard.reducer;
