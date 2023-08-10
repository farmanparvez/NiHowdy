import { createSlice } from "@reduxjs/toolkit";
import { 
  getCurrencyPrice, getBicoinPrice, getCardDetaiails, getPopularDrugs, 
  getRewardValueInYear, rewardPercentBasedOnPrice, emailDefautSavingCard, newsletterEmail,
  // getBlog
} from "../actions/homeMedicineAction";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    btcPrice: null,
    bitcoindPrice: null,
    posts: null,
    cardInfo: [],
    popularDrug: [],
    getRewardValueInYearDetails: [],
    rewardPercentBasedOnPriceDetails: [],
    isLoadingDefaultEmailSavingCard: false
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoadingDefaultEmailSavingCard = false;
      state.message = null;
    },
    setEarBitcoin: (state, action) => {
      
      state.btcPrice = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularDrugs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularDrugs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularDrug = action.payload?.data
      })
      .addCase(getPopularDrugs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrencyPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencyPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.btcPrice = action?.payload.res.data
        state.bitcoindPrice = action?.payload.oneBitcoinPrice
      })
      .addCase(getCurrencyPrice.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getBicoinPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBicoinPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bitcoindPrice = action?.payload.data.price
      })
      .addCase(getBicoinPrice.rejected, (state) => {
        state.isLoading = false;
        state.bitcoindPrice = null
      })
      // .addCase(getBlog.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getBlog.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.posts = action?.payload.items
      // })
      // .addCase(getBlog.rejected, (state) => {
      //   state.isLoading = false;
      // })
      .addCase(getCardDetaiails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCardDetaiails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cardInfo = action?.payload.data
      })
      .addCase(getCardDetaiails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getRewardValueInYear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRewardValueInYear.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getRewardValueInYearDetails = action?.payload.data
      })
      .addCase(getRewardValueInYear.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(rewardPercentBasedOnPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rewardPercentBasedOnPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rewardPercentBasedOnPriceDetails = action?.payload?.data[0]?.range
      })
      .addCase(rewardPercentBasedOnPrice.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(emailDefautSavingCard.pending, (state) => {
        state.isLoadingDefaultEmailSavingCard = true;
      })
      .addCase(emailDefautSavingCard.fulfilled, (state, action) => {
        state.isLoadingDefaultEmailSavingCard = false;
      })
      .addCase(emailDefautSavingCard.rejected, (state) => {
        state.isLoadingDefaultEmailSavingCard = false;
      })
      .addCase(newsletterEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newsletterEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newsletterEmail.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const { reset, setEarBitcoin } = homeSlice.actions;
export default homeSlice.reducer;
