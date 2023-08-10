import { createSlice } from "@reduxjs/toolkit";
import { getSdKToken, createCheck, kycStatus } from "../actions/kycAction";

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    kycDetails: [],
    kycDoc: [],
    isKycDocSubmitLoading: false,
    sdkToken: null,
    current: 1,
    isKycStatus: 1,
    kycStatusIsloading: false,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
      state.isKycDocSubmitLoading = false;
      state.isKycdocLoading = false;
      state.sdkToken = null;
    },
    setKycStatus: (state, action) => {
      state.current = action.payload
      state.isKycStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(kycStatus.pending, (state) => {
        state.kycStatusIsloading = true;
      })
      .addCase(kycStatus.fulfilled, (state, action) => {
        state.kycStatusIsloading = false;
        state.current = action.payload.is_kyc === 4 ? 3 : action.payload.is_kyc
        state.isKycStatus = action.payload.is_kyc
      })
      .addCase(kycStatus.rejected, (state) => {
        state.kycStatusIsloading = false;
      })
      .addCase(getSdKToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSdKToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sdkToken = action.payload.sdkToken;
      })
      .addCase(getSdKToken.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.current = action.payload.is_kyc
      })
      .addCase(createCheck.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const { reset, setKycStatus } = kycSlice.actions;
export default kycSlice.reducer;
