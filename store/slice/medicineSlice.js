import { createSlice } from "@reduxjs/toolkit";
import {
  searchDrugs, drugDetailByName, drugImageByNdCode, getMedicinePricesByGeoCode,
  getMedicinePricesByCode
} from "../actions/medicineAction";

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    isLoading: true,
    isSuccess: false,
    isError: false,
    popularDrug: [],
    popularDrugSearch: [],
    drugDetail: [],
    // drugDetailList: [],
    image: '',
    isPopularDrugSearchLoading: false,
    isPriceLoading: true,
    price: [],
    priceForMap: [],
    center: { Latitude: 34.0522, Longitude: -118.2437 },
    isZipCodeChange: false,
    strengths: [],
    quantity: [],
    initialQuantity: null,
    NDCCode: null,
    isUpdate: false,
    isMecicinePriceLoadedSuccess: false,
    discountPercent: false,
    drugDescription: []
  },
  reducers: {
    reset: (state) => {
      // state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
      state.isPopularDrugSearchLoading = false;
      // state.isPriceLoading = false;
      state.isZipCodeChange = false;
    },
    resetIsUpdateState: (state) => {
      state.isUpdate = false;
    },
    resetPriceLoadedSuccess: (state) => {
      state.isMecicinePriceLoadedSuccess = false;
    },
    setPrice: (state, action) => {
      state.price = [action.payload];
      state.discountPercent = action.payload.bitcoinEarnPercent
    },
    setDrugFilterData: (state, action) => {
      state.drugDetail = action.payload
      state.NDCCode = action.payload[0]?.types[0]?.strength[0]?.Quantity[0].NDCCode
      state.initialQuantity = action.payload[0]?.types[0]?.strength[0]?.Quantity[0].Quantity
      state.strengths = action.payload[0]?.types[0]?.strength
      state.quantity = action.payload[0]?.types[0]?.strength[0]?.Quantity
      state.isUpdate = true
    },
    setFormField: (state, action) => {
      state.filterData = action.payload?.fil
      state.strengths = action.payload.strength
      state.quantity = action.payload.quantity
      state.initialQuantity = action.payload.quantity[0]?.Quantity
      state.NDCCode = action.payload.quantity[0]?.NDCCode
      state.isUpdate = true
    },
    setStrengthField: (state, action) => {
      state.quantity = action.payload.quantity
      state.initialQuantity = action.payload.quantity
      state.initialQuantity = action.payload.quantity[0]?.Quantity
      state.NDCCode = action.payload.NDCCode
      state.isUpdate = true
    },
    setQuantitField: (state, action) => {
      state.initialQuantity = action.payload[0].Quantity
      state.NDCCode = action.payload[0].NDCCode
      state.isUpdate = true
    },
    setMapDrugListAfterCalculatingRewardPercentAndBitcoin: (state, action) => {
      state.priceForMap = action.payload
      state.isMecicinePriceLoadedSuccess = false
    },
    setDiscountPercent: (state, action) => {
      state.discountPercent = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDrugs.pending, (state) => {
        state.isPopularDrugSearchLoading = true;
      })
      .addCase(searchDrugs.fulfilled, (state, action) => {
        state.isPopularDrugSearchLoading = false;
        state.popularDrugSearch = action.payload[0]?.data?.map((res) => ({ value: res?.DrugName }))
      })
      .addCase(searchDrugs.rejected, (state) => {
        state.isPopularDrugSearchLoading = false;
      })
      // .addCase(getPopularDrugs.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getPopularDrugs.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.popularDrug = action.payload[0].data
      // })
      // .addCase(getPopularDrugs.rejected, (state) => {
      //   state.isLoading = false;
      // })
      .addCase(drugImageByNdCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(drugImageByNdCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.image = action.payload
      })
      .addCase(drugImageByNdCode.rejected, (state,) => {
        state.isLoading = false;
      })
      // .addCase(changeDrug.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(changeDrug.fulfilled, (state, action) => {
      //   // state.image = action.payload.image
      //   state.drugDetail = action.payload.changedDrugData
      //   state.NDCCode = action.payload.NDCCode
      //   state.isLoading = false;
      // })
      // .addCase(changeDrug.rejected, (state,) => {
      //   state.isLoading = false;
      // })
      .addCase(drugDetailByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(drugDetailByName.fulfilled, (state, action) => {
        console.log(action.payload)
        // state.drugDetailList = action.payload?.length > 0 ? [...action.payload[0]?.brand, ...action.payload[0]?.generic] : []
        state.drugDetail = action.payload?.length > 0 ? action.payload[0]?.defaultData : []
        state.strengths = action.payload?.length > 0 && action.payload[0]?.defaultData[0]?.types[0]?.strength
        state.quantity = action.payload?.length > 0 && action.payload[0]?.defaultData[0]?.types[0]?.strength[0]?.Quantity
        state.initialQuantity = action.payload?.length > 0 && action.payload[0]?.defaultData[0]?.types[0]?.strength[0]?.Quantity[0].Quantity
        state.NDCCode = action.payload?.length > 0 && action.payload[0]?.defaultData[0]?.types[0]?.strength[0]?.Quantity[0].NDCCode
        state.drugDescription = { drug_name: action.payload[0].drug_name, description: action.payload[0].description }
        state.isUpdate = true;
        state.isLoading = false
      })
      .addCase(drugDetailByName.rejected, (state,) => {
        state.isLoading = false;
      })
      // .addCase(drugDescriptionByName.fulfilled, (state, action) => {
      //   state.drugDescription = action.payload.data
      // })
      .addCase(getMedicinePricesByCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMedicinePricesByCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.priceForMap = action.payload?.Data.sort((a, b) => (a.Price - b.Price))
        state.center = action.payload.center
        state.isZipCodeChange = true
        state.isMecicinePriceLoadedSuccess = true
      })
      .addCase(getMedicinePricesByCode.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMedicinePricesByGeoCode.pending, (state) => {
        state.isPriceLoading = true;
      })
      .addCase(getMedicinePricesByGeoCode.fulfilled, (state, action) => {
        state.isPriceLoading = false;
        state.price = action.payload?.Data.sort((a, b) => (a.Price - b.Price))
        state.priceForMap = action.payload?.Data.sort((a, b) => (a.Price - b.Price))
        state.center = action.payload.center
        state.isMecicinePriceLoadedSuccess = true
        // state.isZipCodeChange = true
      })
      .addCase(getMedicinePricesByGeoCode.rejected, (state) => {
        state.isPriceLoading = false;
      })
  },
});

export const { reset, setPrice, setDrugFilterData, setFormField, setStrengthField, setQuantitField, resetIsUpdateState, resetPriceLoadedSuccess, setMapDrugListAfterCalculatingRewardPercentAndBitcoin, setDiscountPercent } = medicineSlice.actions;
export default medicineSlice.reducer;
