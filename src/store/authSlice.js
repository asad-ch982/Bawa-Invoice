/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  chartData:[],
    data:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthNo: (state, action) => {
       state.data = action.payload
      },
    setChartData: (state, action) => {
       state.chartData = action.payload
      },
  }
});

export const {
    setAuthNo,
    setChartData,

} = authSlice.actions;


export const getAuthNo = (state) => state.auth.data;
export const Chart = (state) => state.auth.chartData;
export default authSlice.reducer;
