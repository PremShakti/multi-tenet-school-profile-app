import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  isChecked: boolean;
  isAuth:boolean;
}

const initialState: CartState = {
  isChecked: false,
  isAuth:false
};

export const cartSlice = createSlice({
  name: "isChecked",
  initialState,
  reducers: {
    isChecked: (state, action) => {
      state.isChecked = action.payload;
    },
    isAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { isChecked,isAuthenticated } = cartSlice.actions;
export default cartSlice.reducer;
