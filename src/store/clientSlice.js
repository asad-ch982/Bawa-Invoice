/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { nanoid } from "nanoid";
import { CLIENTS_KEY, CLIENT_FORM_KEY } from "../constants/localKeys";

const initialState = {
  openClientSelector: false,
  selectedClient: null,
  data: [],
  newForm: {
    id: nanoid(),
    image: "",
    name: "",
    email: "",
    billingAddress: "",
    mobileNo: "",
  },
  editedID: null,
  deletedID: null,
};
const setClients =async(client)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/addclient`,{
    method:'POST',
    // mode:"no-cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({client:client,token:token})
  })
}
const delClient =async(client)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/delclient`,{
    method:'POST',
    // mode:"no-cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({id:client,token:token})
  })
}
const updateClient =async(client)=>{
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/updateclient`,{
    method:'POST',
    // mode:"no-cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({client:client,token:token})
  })
}
export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addNewClient: (state, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;
      setClients(action.payload)

      const reNewForm = {
        id: nanoid(),
        image: "",
        name: "",
        email: "",
        billingAddress: "",
        mobileNo: "",
      };

      state.newForm = { ...reNewForm };
      localforage.setItem(CLIENT_FORM_KEY, reNewForm);
    },

    updateNewClientForm: (state, action) => {
      state.newForm = { ...action.payload };
      localforage.setItem(CLIENT_FORM_KEY, { ...state.newForm });
    },

    updateNewClientFormField: (state, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      localforage.setItem(CLIENT_FORM_KEY, { ...state.newForm });
    },

    setAllClients: (state, action) => {
      state.data = action.payload;
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
    },

    setEditedId: (state, action) => {
      state.editedID = action.payload;
    },

    onConfirmDeletedClient: (state, action) => {
      const newDatas = state.data.filter(
        (client) => client.id !== state.deletedID
      );
      delClient(state.deletedID)
      state.data = newDatas;
      state.deletedID = null;
    },

    onConfirmEditClient: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (client) => client.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      updateClient(action.payload)
      state.editedID = null;
      localforage.setItem(CLIENTS_KEY, [...state.data]);
    },

    setOpenClientSelector: (state, action) => {
      state.openClientSelector = action.payload;
      if (!action.payload) {
        state.selectedClient = null;
      }
    },

    setClientSelector: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (client) => client.id === action.payload
      );
      if (isFindIndex !== -1) {
        state.selectedClient = state.data[isFindIndex];
      }
    },
  },
});

export const {
  addNewClient,
  updateNewClientForm,
  updateNewClientFormField,
  setAllClients,
  setDeleteId,
  setEditedId,
  onConfirmDeletedClient,
  onConfirmEditClient,
  setOpenClientSelector,
  setClientSelector,
} = clientsSlice.actions;

export const getAllClientsSelector = (state) => state.clients.data;

export const getClientNewForm = (state) => state.clients.newForm;

export const getDeletedClientForm = (state) => state.clients.deletedID;

export const getEditedIdForm = (state) => state.clients.editedID;

export const getIsOpenClientSelector = (state) =>
  state.clients.openClientSelector;

export const getSelectedClient = (state) => state.clients.selectedClient;

export default clientsSlice.reducer;
