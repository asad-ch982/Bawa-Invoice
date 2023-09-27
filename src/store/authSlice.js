/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  chartData:[],
    data:"",
    editedID:null,
    deletedID:null,
    authentication:[]

};
const deleteAuthentication =async(id)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/delauth`,{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({id:id,token:token})
  })
  const json = await response.json()
}
const editAuthentication =async(data)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/editauth`,{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({data:data,token:token})
  })
  const json = await response.json()
}
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
      setDeleteId: (state, action) => {
        state.deletedID = action.payload;
      },
  
      setEditedId: (state, action) => {
        state.editedID = action.payload;
        
      },
      setAuthentication: (state, action) => {
        state.authentication = action.payload;
        
      },
       onConfirmEditAuth: (state, action) => {
        const isFindIndex = state.authentication.findIndex(
          (product) => product._id === state.editedID
        );
       editAuthentication(action.payload)
      
        if (isFindIndex !== -1) {
          state.authentication[isFindIndex] = { ...action.payload };
        }
        state.editedID = null;
    
      },
      onConfirmDeletedUser: (state, action) => {
        const newDatas = state.authentication.filter(
          (product) => product._id !== state.deletedID
        );
      deleteAuthentication(state.deletedID)
        state.authentication = newDatas;
        state.deletedID = null;
      },

  }
});

export const {
    setAuthNo,
    setChartData,
    setDeleteId,
    setEditedId,
    setAuthentication,
    onConfirmEditAuth,
    onConfirmDeletedUser

} = authSlice.actions;


export const getAuthNo = (state) => state.auth.data;
export const Chart = (state) => state.auth.chartData;
export const getEditedIdForm = (state) => state.auth.editedID;
export const getDeleteIdForm = (state) => state.auth.deletedID;
export const getAllAuthentication = (state) => state.auth.authentication;

export default authSlice.reducer;
