import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  googleSignUp,
  facebookSignUp,
  signIn,
  getCurrentUser,
  profile,
  forgetPassword,
  verifyOtpForgotPassword,
  resendEmail,
  resetPassword,
  logoutGoogle,
  logout,
  getLoginDeatils
} from "../actions/authActions";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    profileFormData: null,
    show: 1,
    visible: false,
    isForgotPasswordLoading: false,
    isProfileUpdated: false,
    isSuccessGoogleLogin: false,
    isLogin: false,
    isVisible: {}
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
      state.isForgotPasswordLoading = null;
      state.isProfileUpdated = false;
    },
    setFormData: (state, action) => {
      state.profileFormData = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
      state.show = action.payload ? state.show : state.show = 1
    },
    setModalVisible: (state, action) => {
      state.isVisible = action.payload;
      // state.show = action.payload ? state.show : state.show = 1
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("resendEmailToken", action.payload.verification_email_token);
        localStorage.setItem("email", action?.payload?.email);
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("sli", action.payload)
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getLoginDeatils.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginDeatils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getLoginDeatils.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(googleSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignUp.fulfilled, (state) => {
        state.isLoading = false;
        // state.isLogin = true;
      })
      .addCase(googleSignUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutGoogle.fulfilled, (state) => {
        state.isLoading = false;
        state.isLogin = false;
      })
      .addCase(logoutGoogle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        // state.isLogin = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(facebookSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(facebookSignUp.fulfilled, (state) => {
        state.isLoading = false;
        // state.isLogin = true;
      })
      .addCase(facebookSignUp.rejected, (state) => {
        state.isLoading = false;
      })
      // .addCase(getCurrentUser.pending, () => {
      //   // state.isLoading = true;
      // })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        // state.isLogin = true;
        action.payload && localStorage.setItem('googleToken', action.payload)
        state.isSuccess = action.payload && true
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profile.fulfilled, (state) => {
        state.isLoading = false;
        state.isProfileUpdated = true;
      })
      .addCase(profile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resendEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendEmail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isForgotPasswordLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isForgotPasswordLoading = false;
        state.show = 2;
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.isForgotPasswordLoading = false;
      })
      .addCase(verifyOtpForgotPassword.pending, (state) => {
        state.isForgotPasswordLoading = true;
      })
      .addCase(verifyOtpForgotPassword.fulfilled, (state) => {
        state.isForgotPasswordLoading = false;
        state.show = 3;
      })
      .addCase(verifyOtpForgotPassword.rejected, (state) => {
        state.isForgotPasswordLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isForgotPasswordLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isForgotPasswordLoading = false;
        state.show = 1;
        state.visible = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isForgotPasswordLoading = false;
      })
  },
});

export const { reset, setFormData, setVisible, setModalVisible, setShow, setIsLogin } = authSlice.actions;
export default authSlice.reducer;
