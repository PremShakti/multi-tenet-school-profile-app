import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/fetures/buttons/providerButton";

import { authApi } from "./api/auth";


export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,

      [authApi.reducerPath]: authApi.reducer,
     
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
