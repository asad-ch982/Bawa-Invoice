import localforage from "localforage";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  CLIENTS_KEY,
  CLIENT_FORM_KEY,
  COMPANY_KEY,
  PRODUCTS_KEY,
  PRODUCT_FORM_KEY,
  // APP_CONTEXT,
  INVOICE_DETAILS,
  INVOICES_KEY,
  INVOICE_FORM_KEY,
  DEFAULT_INVOICE_COLOR,
  DEFAULT_INVOICE_BG,
} from "../constants/localKeys";
import { useAppContext } from "../context/AppContext";
import { updateNewClientForm, setAllClients } from "../store/clientSlice";
import { updateCompanyData } from "../store/companySlice";
import {
  setAllInvoice,
  setAllInvoiceDetailList,
  updateNewInvoiceForm,
} from "../store/invoiceSlice";
import { setAllProducts, updateNewProductForm } from "../store/productSlice";

const useInitApp = () => {
  const dispatch = useDispatch();
  const { setInitLoading } = useAppContext();
  const setInvoices =async()=>{
    const response = await fetch("https://invoice-data.vercel.app/getinvoices",{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      }
    })
   
    const json = await response.json()
    const data = json.data
    return data
    
  }
  const setProducts =async()=>{
    const response = await fetch("https://invoice-data.vercel.app/getprod",{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      }
    })
    const json = await response.json()
    const data = json
    
    return data
    
  }

  const initialSetData = useCallback(async () => {

    try {
      const invoices = await setInvoices()
      const products = await setProducts()
      const [
        companyData,
        clientNewForm,
        clients,
        productNewForm,
        // products,
        // invoices,
        invoiceDetailList,
        invoiceNewForm,
        defaultColor,
        defaultBackground,
      ] = await Promise.all([
        localforage.getItem(COMPANY_KEY),
        localforage.getItem(CLIENT_FORM_KEY),
        localforage.getItem(CLIENTS_KEY),
        localforage.getItem(PRODUCT_FORM_KEY),
        // localforage.getItem(PRODUCTS_KEY),
        // localforage.getItem(INVOICES_KEY),
        localforage.getItem(INVOICE_DETAILS),
        localforage.getItem(INVOICE_FORM_KEY),
        localforage.getItem(DEFAULT_INVOICE_COLOR),
        localforage.getItem(DEFAULT_INVOICE_BG),
      ]);

      if (companyData) {
        
        dispatch(updateCompanyData(companyData));
      }

      if (clientNewForm) {
        dispatch(updateNewClientForm(clientNewForm));
      }

      if (clients) {
        dispatch(setAllClients(clients));
      }

      if (productNewForm) {
        dispatch(updateNewProductForm(productNewForm));
      }

      if (products) {
        dispatch(setAllProducts(products));
      }

      if (invoiceNewForm) {
        dispatch(updateNewInvoiceForm(invoiceNewForm));
      }

      if (invoices) {
        dispatch(setAllInvoice(invoices));
      }

      if (invoiceDetailList) {
        dispatch(setAllInvoiceDetailList(invoiceDetailList));
      }

      if (defaultColor) {
      }

      if (defaultBackground) {
      }


    } catch (e) {
      console.log(e);
    } finally {
      setInitLoading(false);
    }
  }, [dispatch, setInitLoading]);

  return {
    initialSetData,
  };
};

export default useInitApp;
