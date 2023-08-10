import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import authSlice from "./slice/slice";
import authSlice from "./slice/authSlice";
import profileSlice from "./slice/profileSlice";
import globalSlice from "./slice/globalSlice";
import medicineSlice from "./slice/medicineSlice"
import homeMedicineSlice from "./slice/homeMedicineSlice"
import savingCardSlice from "./slice/savingCardSlice"
import kycSlice from "./slice/kycSlice"
import accountSlice from "./slice/accountSlice";
import prescriptionHistory from "./slice/prescriptionHistorySlice";
import qrSlice from "./slice/qrSlice";
import bitcoinReward from "./slice/bitcoinRewardSlice";
import blogSlice from "./slice/blogSlice";

const combinedReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    global: globalSlice,
    medicine: medicineSlice,
    home: homeMedicineSlice,
    profileSavingCard: savingCardSlice,
    kyc: kycSlice,
    account: accountSlice,
    history: prescriptionHistory,
    qr: qrSlice,
    reward: bitcoinReward,
    blog: blogSlice
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
    });

export const wrapper = createWrapper(makeStore, { debug: false });