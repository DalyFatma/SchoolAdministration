import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import { studentSlice } from "features/student/studentSlice";
import { programmSlice } from "features/programms/programmSlice";
import { accountSlice } from "features/account/accountSlice";
import authSlice from "features/account/authSlice";


export const store = configureStore({
  reducer: {
    [studentSlice.reducerPath]: studentSlice.reducer,
    [programmSlice.reducerPath]: programmSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    auth: authSlice,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      studentSlice.middleware,
      programmSlice.middleware,
      accountSlice.middleware
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
