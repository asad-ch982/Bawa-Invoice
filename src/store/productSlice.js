import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { nanoid } from "nanoid";
import { PRODUCTS_KEY, PRODUCT_FORM_KEY } from "../constants/localKeys";

const initialState = {
  openProductSelector: false,
  selectedProduct: null,
  data: [],
  newForm: {
    slug: nanoid(),
    productID: "",
    image: "",
    name: "",
    amount: 0,
    // wholeSalePrice:0,
    // desc:"",
    // company:"",
    // color:"",
    // variant:"",
    // category:"",
    availableQty:""
  },
  editedID: null,
  deletedID: null,
};
const setProducts =async(data)=>{
  const response = await fetch("https://bawa-projects.vercel.app/api/addprod",{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    mode:"no-cors",
    body: JSON.stringify({data:data})
  })
  const json = await response.json()
}
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addNewProduct: (state, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;
      console.log(action.payload)
      localforage.setItem(PRODUCTS_KEY, newDatas);
      setProducts(action.payload)

      const reNewForm = {
        slug: nanoid(),
        productID: "",
        image: "",
        name: "",
        amount: 0,
        // wholeSalePrice:0,
        // desc:"",
        // company:"",
        // color:"",
        // variant:"",
        // category:"",
        availableQty:""
      };

      state.newForm = { ...reNewForm };
      
      localforage.setItem(PRODUCT_FORM_KEY, reNewForm);
    },

    updateNewProductForm: (state, action) => {
      state.newForm = { ...action.payload };
      localforage.setItem(PRODUCT_FORM_KEY, { ...state.newForm });
    },

    updateNewProductFormField: (state, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      localforage.setItem(PRODUCT_FORM_KEY, { ...state.newForm });
    },

    setAllProducts: (state, action) => {
      state.data = action.payload;
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
      console.log(state.deletedID)
    },

    setEditedId: (state, action) => {
      state.editedID = action.payload;
      
    },

    onConfirmDeletedProduct: (state, action) => {
      const newDatas = state.data.filter(
        (product) => product.slug !== state.deletedID
      );
      state.data = newDatas;
      state.deletedID = null;
      localforage.setItem(PRODUCTS_KEY, newDatas);
    },

    onConfirmEditProduct: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (product) => product.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.editedID = null;
      localforage.setItem(PRODUCTS_KEY, [...state.data.map(product => JSON.parse(JSON.stringify(product)))]);
    },

    setOpenProductSelector: (state, action) => {
      state.openProductSelector = action.payload;
      if (!action.payload) {
        state.selectedProduct = null;
      }
    },

    setProductSelector: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (product) => product.slug === action.payload
      );
      if (isFindIndex !== -1) {
        state.selectedProduct = state.data[isFindIndex]; 
      }
    },
  },
});
// asad
export const {
  addNewProduct,
  updateNewProductForm,
  updateNewProductFormField,
  setAllProducts,
  setDeleteId,
  setEditedId,
  onConfirmDeletedProduct,
  onConfirmEditProduct,
  setOpenProductSelector,
  setProductSelector,
} = productSlice.actions;

export const getAllProductSelector = (state) => state.products.data;

export const getProductNewForm = (state) => state.products.newForm;

export const getDeletedProductForm = (state) => state.products.deletedID;

export const getEditedIdForm = (state) => state.products.editedID;

export const getIsOpenProductSelector = (state) =>
  state.products.openProductSelector;

export const getSelectedProduct = (state) => state.products.selectedProduct;

export default productSlice.reducer;
