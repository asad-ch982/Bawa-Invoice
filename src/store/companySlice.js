import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { COMPANY_KEY } from "../constants/localKeys";

const initialState = {
  data: {
    id: "companyID",
    image: "",
    billingAddress: "",
    companyName: "",
    companyEmail: "",
    companyMobile: "",
  },
};
const setCompany =async(company)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch("https://invoice-data.vercel.app/addcompany",{
    method:'POST',
    // mode:"no-cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({company:company,token:token})
  })
}
export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateCompanyData: (state, action) => {
      try {
        const {
          image,
          billingAddress,
          companyName,
          companyEmail,
          companyMobile,
        } = action.payload;
        state.data.image = image ? image : "";
        state.data.billingAddress = billingAddress ? billingAddress : "";
        state.data.companyName = companyName ? companyName : "";
        state.data.companyEmail = companyEmail ? companyEmail : "";
        state.data.companyMobile = companyMobile ? companyMobile : "";
        setCompany(action.payload)
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const { updateCompanyData } = companySlice.actions;

export const getCompanyData = (state) => state.company.data;

export default companySlice.reducer;
