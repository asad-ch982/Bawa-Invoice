import React,{useRef,useCallback} from 'react'
import Button from '../Button/Button'
import SectionTitle from '../Common/SectionTitle'
import { getAllProductSelector } from '../../store/productSlice'
import { useSelector } from "react-redux";
import NumberFormat from 'react-number-format';
import ProductIcon from '../Icons/ProductIcon';
import { useAppContext } from '../../context/AppContext';
import { useReactToPrint } from 'react-to-print';
const ProductPrint = () => {
    const { initLoading: isInitLoading, showNavbar, toggleNavbar, setEscapeOverflow } =
    useAppContext();
    const allProducts = useSelector(getAllProductSelector);
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
  return (
    <div className='bg-white rounded-xl p-4'>
      <SectionTitle> Print All Products </SectionTitle>
      <div className="mt-3">
        <Button onClick={handleExport} block={1}>
          <span className="inline-block ml-2"> Print </span>
        </Button>
      </div>
      <div className='hidden'>
        <div>
        <table ref={componentRef} className="w-full whitespace-nowrap px-10 mt-8">
                        <thead>
                        
                            <tr className="h-10 w-full text-sm leading-none text-black">
                                <th className="font-semibold text-left pl-12">Product Name</th>
                                <th className="font-semibold text-left pl-12">Quantity</th>
                                <th className="font-semibold text-left pl-20">Product Amount</th>
                                <th className="font-semibold text-left pl-20">ProductID</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                     
                    { allProducts && 
                    allProducts.map((products)=>(
                    <tr key={products.slug}  className="h-10 text-sm leading-none text-black bg-white hover:bg-gray-100  border-t border-gray-100">
                              
                                <td className="pl-12">
                                <div className="flex items-center">
                                        <div className="">
                                       <ProductIcon/>
                                        </div>
                                        <div className="pl-4">
                                            <p className="font-medium">{products.name}</p>
                                        </div>
                                    </div>
                                 
                                  
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium text-center">{products.availableQty}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium text-center"> <NumberFormat
                  value={products.amount}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                /></p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium ">{products.productID || "#"}</p>
                                </td>
                              
                           
                            </tr>
                      )) }
                        </tbody>
                    </table>
        </div>
      </div>
    </div>
  )
}

export default ProductPrint
