import React,{useState,useEffect,useCallback,useRef} from "react";
import ProductIcon from "../Icons/ProductIcon";
import { useAppContext } from "../../context/AppContext";
import { useReactToPrint } from "react-to-print";
import { defaultSkeletonNormalStyle } from "../../constants/defaultStyles";
import Skeleton from "react-loading-skeleton";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getClosingTableData ,setClosingTableData,setClosingDeatail,getClosingDetail} from "../../store/invoiceSlice";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";


const ClosingTable=()=> {
    const { initLoading: isInitLoading, showNavbar, toggleNavbar, setEscapeOverflow } =
    useAppContext();
    const dispact = useDispatch()
    const ClosingData = useSelector(getClosingTableData)
    const ClosingDetail = useSelector(getClosingDetail)
    var d = new Date(Date.now());
    const date= d.toLocaleDateString('en-GB');
const [productDetail, setProductDetail] = useState({})
const [startDate, setStartDate] = useState(new Date())
const [start, setStart] = useState(date);
const fetchData = async()=>{
   setEscapeOverflow(true)
   try {
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/closing`, {
        method: "POST",
  
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({date:start,token:token }),
      });
  
      const json = await response.json();
      dispact(setClosingTableData(json.detail))
      dispact(setClosingDeatail(json))

      setEscapeOverflow(false)
    } catch (error) {
        console.log(error)
        setEscapeOverflow(false)
    }
    }

    // useEffect(() => {
    // fetchData()
    
    // }, [])


    const componentRef = useRef(null);
    const reactToPrintContent = useCallback(() => {
      return componentRef.current;
    }, []);
    const handlePrint = useReactToPrint({
      content:  reactToPrintContent,
      documentTitle: "Invoice Letter",
      onAfterPrint: useCallback(() => {
        setEscapeOverflow(false);
      }, [setEscapeOverflow]),
      removeAfterPrint: true,
    });

    const handleExport = useCallback(() => {
        setEscapeOverflow(true);
        setTimeout(() => {
          handlePrint();
        }, 3000);
      }, [handlePrint, setEscapeOverflow, showNavbar, toggleNavbar]);
      const handlerstart = (date) => {
        setStart(moment(date).format("DD/MM/YYYY"));
        setStartDate(date);
      };
    
    return (
        <>
        <div className="mb-4 flex">
        <div className="flex mt-2">
        From:
        <div className="flex-1">
          {isInitLoading ? (
            <Skeleton className={defaultSkeletonNormalStyle} />
          ) : (
            <DatePicker
              selected={startDate}
              onChange={(date) => handlerstart(date)}
              disabled={isInitLoading}
              className="  bg-white  border-blue-700 w-32 ml-2 rounded-lg px-3 border-2"
            />
          )}
        </div>
      </div>
      <button onClick={fetchData} className="py-3 px-8 mx-4 bg-blue-500 text-white text-sm rounded-3xl items-center ButtonAni">Fetch</button>
        </div>
            <div ref={componentRef} className="w-full sm:px-6">
              
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                {ClosingDetail &&  <div className="flex justify-between mx-20 border-b-4 border-black py-2 mb-6">
                    <div className="text-black font-bold ">Total Amount : Rs    <NumberFormat
                  value={ClosingDetail.sum}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                /></div>
                    <div className="text-black font-bold ">Total Products : {ClosingDetail.TotalProducts}</div>
                    <div className="text-black font-bold ">Closing Date : {ClosingDetail.date}</div>

                  </div>}
                    <table className="w-full whitespace-nowrap">
                        <thead>
                        
                            <tr className="h-16 w-full text-sm leading-none text-black">
                                <th className="font-semibold text-left pl-4">Sr #</th>
                                <th className="font-semibold text-left pl-12">Product Name</th>
                                <th className="font-semibold text-left pl-12">Quantity</th>
                                <th className="font-semibold text-left pl-20">Product Amount</th>
                                <th className="font-semibold text-left pl-20">ProductID</th>
                                <th className="font-semibold text-left pl-20">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                       {ClosingData && Object.keys(ClosingData).map((slug, index) => {
                const objectData = ClosingData[slug];
     
                return  <tr key={slug} className="h-20 text-sm leading-none text-black bg-white hover:bg-gray-100  border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                <p className="text-sm font-medium leading-none text-gray-800">{slug}</p>
                                </td>
                                <td className="pl-12">
                                <div className="flex items-center">
                                        <div className="">
                                       <ProductIcon/>
                                        </div>
                                        <div className="pl-4">
                                            <p className="font-medium">{objectData.name}</p>
                                        </div>
                                    </div>
                                 
                                  
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium text-center">{objectData.quantity}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium text-center"> <NumberFormat
                  value={objectData.amount}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                /></p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium text-center">{objectData.productID==="" ? "-------":objectData.productID}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium text-center"> <NumberFormat
                  value={objectData.amount *objectData.quantity }
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                /></p>
                                </td>
                           
                            </tr>})}
                           
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 w-full container mx-10">
          {ClosingData &&  <button onClick={handleExport} className="py-3 px-8 mx-4 bg-blue-500 text-white text-sm rounded-3xl items-center ButtonAni">Print</button>}
           </div>
        </>
    );
}

export default ClosingTable;
