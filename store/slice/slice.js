import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
    authState: false,
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthState(state, action) {
            state.authState = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            state.authState = action.payload.authSlice
        })
        // [HYDRATE]: (state, action) => {
        //     return {
        //         ...state,
        //         ...action.payload.auth,
        //     };
        // },
    },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state) => state.authSlice;

export default authSlice.reducer;