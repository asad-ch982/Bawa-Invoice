/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthNo: (state, action) => {
       state.data = action.payload
      },
  }
});

export const {
    setAuthNo,

} = authSlice.actions;


export const getAuthNo = (state) => state.auth.data;
export default authSlice.reducer;
