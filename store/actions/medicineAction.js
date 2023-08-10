import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchDrugAPI,
  drugDetailAPI,
  drugImageByNdCodeAPI,
  getMedicinePricesByCodeAPI,
  getMedicinePricesByGeoCodeAPI,
  drugDescriptionAPI
} from "../../service/medicineAPI";
import { notificationHandler } from "../slice/globalSlice";
import { getCenter } from "geolib";
import { rewardPercentBasedOnPrice } from "./homeMedicineAction";

export const searchDrugs = createAsyncThunk(
  "drug/searchDrugs",
  async (val, thunkAPI) => {
    try {
      const res = await searchDrugAPI(val);
      if (res[0]?.data?.length === 0) {
        window.dataLayer.push({
          event: 'searchterm',
          message: "no data found"
        });
      }
      return res;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      window.dataLayer.push({
        event: 'searchterm',
        message: "search failed"
      });
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const drugDescriptionByName = createAsyncThunk(
//   "drug/drugDescriptionByName",
//   async (name, thunkAPI) => {
//     try {
//       var drugDescription = await drugDescriptionAPI(name);
//       // console.log(data)
//       return drugDescription
//     } catch (error) {
//       const message = error?.response?.data?.message || error.toString();
//       thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const drugDetailByName = createAsyncThunk(
//   "drug/drugDetailAPI",
//   async (name, thunkAPI) => {
//     try {
//       var data = await drugDetailAPI(name);
//       await thunkAPI.dispatch(drugDescriptionByName({ drug_name: name?.DrugName }))
//       var Data = [...data][0]?.data
//       const brand = Data[0]?.brand?.map(res => { return { ...res, type: 'Brand Drug' } })
//       const generic = Data[0]?.generic?.map(res => { return { ...res, type: 'Generic' } })
//       const defaultValue = Data[0]?.brand_name_code === "Brand" ? brand : generic
//       if (Data?.length > 0) {
//         Data[0].brand = brand
//         Data[0].generic = generic
//         Data[0].defaultData = defaultValue
//       }
//       return Data;
//     } catch (error) {
//       const message = error?.response?.data?.message || error.toString();
//       thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
export const drugDetailByName = createAsyncThunk(
  "drug/drugDetailAPI",
  async (name, thunkAPI) => {
    try {
      const all = await Promise.all([
        await drugDescriptionAPI({ drug_name: name?.DrugName }),
        await drugDetailAPI(name)
      ])
      var data = await all[1]
      var Data = [...data][0]?.data
      const defaultValue = Data[0]?.brand_name_code === "Brand" ? Data[0]?.brand : Data[0]?.generic
      if (Data?.length > 0) {
        Data[0].defaultData = defaultValue
        Data[0].drug_name = all[0].data[0].drug_name
        Data[0].description = all[0].data[0].description
      }
      return Data;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const drugImageByNdCode = createAsyncThunk(
  "drug/drugImageByNdCode",
  async (ndcode, thunkAPI) => {
    try {
      const res = await drugImageByNdCodeAPI(ndcode);
      return res?.file_url;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMedicinePricesByCode = createAsyncThunk(
  "drug/getMedicinePricesByCode",
  async (val, thunkAPI) => {
    try {
      const data = await getMedicinePricesByCodeAPI(val);
      const vals = data[0]?.data?.map(res => { return { latitude: res.Lat, longitude: res.Long } })
      const res = [...data][0]?.data
      const Data = res.map(res => {
        const ActualPecentage = res?.PercentSaved?.replace("%", "")?.trim()
        const retailPrice = res?.Price / (1 - (ActualPecentage / 100))
        return { ...res, retailPrice }
      })
      const center = getCenter(vals);
      if (Data.length === 0) thunkAPI.dispatch(notificationHandler({ status: "info", message: { en: 'Data not found for this zipcode' } }));
      return { center, Data };
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMedicinePricesByGeoCode = createAsyncThunk(
  "drug/getMedicinePricesByGeoCode",
  async (val, thunkAPI) => {
    try {
      var data = await getMedicinePricesByGeoCodeAPI(val);
      if (data[0].data.length === 0) data = await getMedicinePricesByGeoCodeAPI({ ...val, Latitude: 34.0522, Longitude: -118.2437 });
      const vals = data[0]?.data?.map(res => { return { latitude: res.Lat, longitude: res.Long } })
      const res = [...data][0]?.data
      const Data = res.map(res => {
        const ActualPecentage = res?.PercentSaved?.replace("%", "")?.trim()
        const retailPrice = res?.Price / (1 - (ActualPecentage / 100))
        return { ...res, retailPrice }
      })
      await thunkAPI.dispatch(rewardPercentBasedOnPrice())
      const center = getCenter(vals);
      return { center, Data };
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
