import localforage from "localforage";
import { useCallback } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {
  DEFAULT_INVOICE_COLOR,
  DEFAULT_INVOICE_BG,
} from "../constants/localKeys";
import { useAppContext } from "../context/AppContext";
import { updateNewClientForm, setAllClients } from "../store/clientSlice";
import { updateCompanyData } from "../store/companySlice";
import {
  setAllInvoice,
  setAllUnpaidInvoice,
  setAllInvoiceDetailList,
  updateNewInvoiceForm,
} from "../store/invoiceSlice";
import {getAuthNo} from "../store/authSlice"
import { setAllProducts, updateNewProductForm } from "../store/productSlice";

const useInitApp = () => {
  const dispatch = useDispatch();
  const { setInitLoading } = useAppContext();
  const authentication = useSelector(getAuthNo);
  const getInvoices =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    var d = new Date(Date.now());
    const date= d.toLocaleDateString('en-GB');
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getinvoices`,{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({date:date,authno:authentication.authNo,token:token})
    })
   
    const json = await response.json()
    const data = json.data
    return data
    
  }
  const getUnpaidInvoices =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    var d = new Date(Date.now());
    const date= d.toLocaleDateString('en-GB');
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getunpaid`,{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({date:date,authno:authentication.authNo,token:token})
    })
   
    const json = await response.json()
    const data = json.data
    return data
    
  }
  const getProducts =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getprod`,{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({authno:authentication.authNo,token:token})
    })
    const json = await response.json()
    const data = json
    
    return data
    
  }
  const getcompany =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getcompany`,{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({authno:authentication.authNo,token:token})
    })
    const json = await response.json()
    const data = json.company
    
    return data
    
  }
  const getclients =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getclients`,{
      method:'POST',
      // mode:"no-cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({authno:authentication.authNo,token:token})
    })
    const json = await response.json()
    const data = json.clients
    
    return data
    
  }
  const getinvoicedetail =async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
      var d = new Date(Date.now());
  const date= d.toLocaleDateString('en-GB');
    const response = await fetch(`${process.env.REACT_APP_PROXY}/getinvoicedetail`,{
  method:'POST',

  headers:{
    'content-type':'application/json'
  },
  body: JSON.stringify({date:date,authno:authentication.authNo,token:token})
})
const json = await response.json()
  const detail =  json.data 
  return detail
  }

  const initialSetData = useCallback(async () => {

    try {
      const invoices = await getInvoices()
      const products = await getProducts()
      const companyData = await getcompany()
      const clients = await getclients()
      const invoiceDetailList= await getinvoicedetail()
      const unpaid = await getUnpaidInvoices()
      const [
        // companyData,
        clientNewForm,
        // clients,
        productNewForm,
        // products,
        // invoices,
        // invoiceDetailList,
        invoiceNewForm,
        defaultColor,
        defaultBackground,
      ] = await Promise.all([
        // localforage.getItem(COMPANY_KEY),
        // localforage.getItem(CLIENT_FORM_KEY),
        // localforage.getItem(CLIENTS_KEY),
        // localforage.getItem(PRODUCT_FORM_KEY),
        // localforage.getItem(PRODUCTS_KEY),
        // localforage.getItem(INVOICES_KEY),
        // localforage.getItem(INVOICE_DETAILS),
        // localforage.getItem(INVOICE_FORM_KEY),
        localforage.getItem(DEFAULT_INVOICE_COLOR),
        localforage.getItem(DEFAULT_INVOICE_BG),
      ]);

      if (companyData) {
        
        dispatch(updateCompanyData(companyData));
      }
      if (unpaid) {
        
        dispatch(setAllUnpaidInvoice(unpaid));
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
