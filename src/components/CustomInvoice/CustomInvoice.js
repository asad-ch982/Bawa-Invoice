/* eslint-disable no-useless-escape */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import Button from "../Button/Button";
import SectionTitle from "../Common/SectionTitle";
import { useAppContext } from "../../context/AppContext";
import DatePicker from "react-datepicker";
import moment from"moment";
import {
    setAllInvoice,
    setAllInvoiceDetailList,
  } from "../../store/invoiceSlice";
import {
  defaultInputStyle,
  defaultInputInvalidStyle,
  defaultInputLargeStyle,
  defaultInputLargeInvalidStyle,
  defaultSkeletonLargeStyle,
  defaultSkeletonNormalStyle,
} from "../../constants/defaultStyles";




function CustomInvoice({reset}) {
  const dispatch = useDispatch();

  const { initLoading: isInitLoading } = useAppContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [isTouched, setIsTouched] = useState(false);
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
 


  const fetchDetailData =async(invoiceDetailList)=>{
    setIsTouched(true);
    let invoiceDetailData = []
    for (const key in invoiceDetailList) {
      if (invoiceDetailList.hasOwnProperty(key) && invoiceDetailList[key].id) {
        invoiceDetailData.push({id:invoiceDetailList[key].id}); 
      } 
  }
    const response = await fetch("https://invoice-data.vercel.app/cusinvoicedata",{
      method:'POST',
    
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({start:start,end:end,data:invoiceDetailData})
    })
    try {
      
  
      const text = await response.text();
        const lines = text.split('\n');
        const newData = lines
          .filter((line) => line.trim() !== '') // Filter out empty lines
          .map((line) => JSON.parse(line));
      
     
   
  
   const invoiceDetailList = newData[0]
  //  const invoices = newData[0]
  //    let invoiceData = []
  //    let invoiceDetailData = []
  //     for (const key in invoiceDetailList) {
  //       if (invoiceDetailList.hasOwnProperty(key) && invoiceDetailList[key].data) {
  //         invoiceDetailData.push(invoiceDetailList[key].data); 
  //       } 
  //   }
  //   for (const key in invoices) {
  //     if (invoices.hasOwnProperty(key) && invoices[key].data) {
  //         invoiceData.push(...invoices[key].data); 
  //     } 
  // }
  
  
  //  dispatch(setAllInvoice(invoices));
   dispatch(setAllInvoiceDetailList(invoiceDetailList));
  } catch (error) {
      if (error) {
        console.log(error)
        return
      }
  }
  }


  const submitHandler = async() => {

    setIsTouched(true);
  
    const response = await fetch("https://invoice-data.vercel.app/cusinvoice",{
      method:'POST',
    
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({start:start,end:end})
    })
    try {
      
     
      const text = await response.text();
        const lines = text.split('\n');
        const newData = lines
          .filter((line) => line.trim() !== '') // Filter out empty lines
          .map((line) => JSON.parse(line));
      
     
   
 
  //  const invoiceDetailList = newData[1]
   const invoices = newData[0]
   fetchDetailData(invoices);
   console.log(invoices)
//    let invoiceData = []
//    let invoiceDetailData = []
//     for (const key in invoiceDetailList) {
//       if (invoiceDetailList.hasOwnProperty(key) && invoiceDetailList[key].data) {
//         invoiceDetailData.push(invoiceDetailList[key].data); 
//       } 
//   }
//   for (const key in invoices) {
//     if (invoices.hasOwnProperty(key) && invoices[key].data) {
//         invoiceData.push(...invoices[key].data); 
//     } 
// }
  
  
   dispatch(setAllInvoice(invoices));
  //  dispatch(setAllInvoiceDetailList(invoiceDetailList));
  } catch (error) {
      if (error) {
        console.log(error)
        return
      }
  }
// reset()
toast.success("Done!", {
    position: "bottom-center",
    autoClose: 2000,
  });
    setIsTouched(false);
  }




  
  const handlerstart =(date)=>{
    setStart(moment(date).format('YYYY-MM-DD'))
    setStartDate(date)
  }
  const handlerend =(date)=>{
    setEnd(moment(date).format('YYYY-MM-DD'))
    setendDate(date)
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <SectionTitle>Get Previous Data</SectionTitle>
      <div className="flex mt-2">
        From:
        <div className="flex-1">
          {isInitLoading ? (
            <Skeleton className={defaultSkeletonNormalStyle} />
          ) : (
            <DatePicker
            selected={startDate}
            onChange={(date) =>
              handlerstart(date)
            }
            disabled={isInitLoading}
            className=" text-right bg-white  border-blue-700 w-28 ml-2 rounded-lg px-3 border-2"
            
          />
          )}
        </div>
      </div>
      <div className="flex mt-2">
        To:
        <div className="flex-1">
          {isInitLoading ? (
            <Skeleton className={defaultSkeletonNormalStyle} />
          ) : (
            <DatePicker
            selected={endDate}
            onChange={(date) =>
              handlerend(date)
            }
            disabled={isInitLoading}
            className=" text-right bg-white  border-blue-700 w-28 ml-2 rounded-lg px-3 border-2"
            
          />
          )}
        </div>
      </div>


      <div className="mt-3">
        <Button onClick={submitHandler} block={1}>
          <span className="inline-block ml-2"> Submit </span>
        </Button>
      </div>
    </div>
  );
}

export default CustomInvoice;
