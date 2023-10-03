import React from 'react'
import { useCallback } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useAppContext } from "../context/AppContext";
import moment from 'moment';
import {
    setAllInvoice,
    setAllInvoiceDetailList,
    setClosingDeatail,
    setClosingTableData
    
  } from "../store/invoiceSlice";
  import { setAllProducts } from "../store/productSlice";
 
const useReloadInvoice = () => {
    const { setInitLoading } = useAppContext();
    const dispatch = useDispatch();
    const getProducts =async()=>{
        const token = JSON.parse(localStorage.getItem("Token"))
        const response = await fetch(`${process.env.REACT_APP_PROXY}/getprod`,{
          method:'POST',
          // mode:"no-cors",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify({token:token})
        })
        const json = await response.json()
        const data = json
        
        return data
        
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
          body: JSON.stringify({date:date,token:token})
        })
       
        const json = await response.json()
        const data = json.data
        return data
        
      }
      const getClosing = async()=>{
        try {
         const token = JSON.parse(localStorage.getItem("Token"))
         var d = new Date(Date.now());
         const start = moment(d).format("DD/MM/YYYY")
         const response = await fetch(`${process.env.REACT_APP_PROXY}/closing`, {
             method: "POST",
       
             headers: {
               "content-type": "application/json",
             },
             body: JSON.stringify({date:start,token:token }),
           });
       
           const json = await response.json();
          //  console.log(json.detail)
           return json
         } catch (error) {
             console.log(error)
         }
         }

      const reloadData = useCallback(async () => {

        try {
          const invoices = await getInvoices()
          const products = await getProducts()
          const closing = await getClosing()
 
        //   const invoiceDetailList= await getinvoicedetail()
        
    
       
        if (closing) {
          dispatch(setClosingTableData(closing.detail));
          dispatch(setClosingDeatail(closing));
  
        }
    
          if (products) {
            dispatch(setAllProducts(products));
          }
    
    
          if (invoices) {
            dispatch(setAllInvoice(invoices));
          }
    
        //   if (invoiceDetailList) {
        //     dispatch(setAllInvoiceDetailList(invoiceDetailList));
        //   }
  
    
    
        } catch (e) {
          console.log(e);
        } finally {
          setInitLoading(false);
        }
      }, [dispatch, setInitLoading]);
    





    return {
        reloadData
    }
}

export default useReloadInvoice
