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
import {getAuthNo,Chart,setChartData} from "../store/authSlice"
import { setAllProducts, updateNewProductForm } from "../store/productSlice";

const useInitApp = () => {
  const dispatch = useDispatch();
  const { setInitLoading } = useAppContext();
  const authentication = useSelector(getAuthNo);
  function isoStringToDate(s) {
    var b = s.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0));
  }
const handleMonth = async()=>{
 try {
  const token = JSON.parse(localStorage.getItem("Token"))
  const response = await fetch(`${process.env.REACT_APP_PROXY}/weeklychart`, {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({month:"08",token:token }),
    });

    const json = await response.json();
    const invoices = json.invoices
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dailySales = Array(7).fill(0);
    
    invoices.forEach((invoice) => {
      if (invoice.data && invoice.createdAt) {
        const dayIndex = isoStringToDate(invoice.createdAt).getDay();
        dailySales[dayIndex] += invoice.data[0].totalAmount;
      }
    });
    
    const chartData = days.map((day, index) => ({
      name: day,
      Sale: dailySales[index],
    }));
    
    return chartData;
  } catch (error) {
      console.log(error)
  
  }
  }

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
      const chart = await handleMonth()
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
      if (chart) {
        console.log(chart)
        dispatch(setChartData(chart));
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
