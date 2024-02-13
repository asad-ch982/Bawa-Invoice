import React, { useState, useCallback, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PageTitle from "../../components/Common/PageTitle";
import { useAppContext } from "../../context/AppContext";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  defaultSkeletonNormalStyle,
  IconStyle,
} from "../../constants/defaultStyles";
import Button from "../../components/Button/Button";
import InvoiceIcon from "../../components/Icons/InvoiceIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedProduct,
  setOpenProductSelector,
} from "../../store/productSlice";
import { getAllInvoiceDetailSelector } from "../../store/invoiceSlice";
import ProductIcon from "../../components/Icons/ProductIcon";
import NumberFormat from "react-number-format";

const HistoryScreen = () => {
  const {
    initLoading: isInitLoading,
    showNavbar,
    toggleNavbar,
    setEscapeOverflow,
  } = useAppContext();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(getSelectedProduct);
  const allInvoiceDetails = useSelector(getAllInvoiceDetailSelector);

  var d = new Date(Date.now());
  const date = d.toLocaleDateString("en-GB");

  const [startDate, setStartDate] = useState(new Date());
  const [start, setStart] = useState(date);
  const [product, setproduct] = useState(null);
  const [productForm, setProductForm] = useState({});

  const handlerstart = (date) => {
    setStart(moment(date).format("DD/MM/YYYY"));
    setStartDate(date);
  };

  const openChooseProduct = useCallback(() => {
    setproduct(null);
    setProductForm({});
    dispatch(setOpenProductSelector(true));
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct !== null) {
      // If Choosen Exisiting Client And This form is news
      setproduct(selectedProduct);
    }
  }, [selectedProduct]);
  const fetchProducts = async (id) => {
    
    const token = JSON.parse(localStorage.getItem("Token"));
    const getInvoiceDetail = allInvoiceDetails.find((inv) => inv.id === id);
    if (getInvoiceDetail) {
      return;
    } else if (!getInvoiceDetail) {
      setEscapeOverflow(true);
      const response = await fetch(`${process.env.REACT_APP_PROXY}/historysale`, {
        method: "POST",

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ hash: id, date: start, token: token }),
      });
      const json = await response.json();

      setProductForm(json.idProductPairs);
      console.log(json.idProductPairs);
      setEscapeOverflow(false);
    }

  };
  const totalQuantity = Object.values(productForm).reduce(
    (sum, product) => sum + +product.quantity,
    0
  );
  const totalPrice = Object.values(productForm).reduce(
    (sum, product) => sum + product.amount * product.quantity,
    0
  );
  return (
    <div>
      <div className="p-4">
        <PageTitle title="History" />
      </div>
      <div className="bg-white py-4 mx-4 rounded-lg">
        <div className=" flex justify-between w-11/12 mx-auto  px-2 py-2">
          <div className="productSelector">
            <Button size="md" block={1} onClick={openChooseProduct}>
              <ProductIcon style={IconStyle} className="w-5 h-5" />
              {product ? product.name : "Choose Product"}
            </Button>
          </div>

          <div className="dateee py-3">
            <div className="flex">
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
          </div>
          <div>
            <Button
              onClick={() => {
                fetchProducts(product.slug);
              }}
              size="md"
              block={1}
              
            >
              Search
            </Button>
          </div>
        </div>

      {product  &&  <div className="mt-10">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-10 w-full text-sm leading-none text-black">
                <th className="font-semibold text-left pl-12">Product Name</th>
                <th className="font-semibold text-left pl-12">Quantity</th>
                <th className="font-semibold text-left pl-20">
                  Product Amount
                </th>
                <th className="font-semibold text-left pl-20">ProductID</th>
                <th className="font-semibold text-left pl-20">Total Amount</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {productForm &&
                Object.entries(productForm).map(([id, product]) => {
                  return (
                    <tr
                      key={id}
                      className="h-10 text-sm leading-none text-black bg-white hover:bg-gray-100  border-t border-gray-100"
                    >
                      <td className="pl-12">
                        <div className="flex items-center">
                          <div className="">
                            <ProductIcon />
                          </div>
                          <div className="pl-4">
                            <p className="font-medium">{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium text-center">
                          {product.quantity}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium text-center">
                          {" "}
                          <NumberFormat
                            value={product.amount}
                            className=""
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <span {...props}>{value}</span>
                            )}
                          />
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium text-center">
                          {product.productID === ""
                            ? "-------"
                            : product.productID}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium text-center">
                          {" "}
                          <NumberFormat
                            value={product.amount * product.quantity}
                            className=""
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <span {...props}>{value}</span>
                            )}
                          />
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="mt-2 p-4 w-10/12 mx-auto justify-between flex">
            <div className="text-black font-semibold text-xl">Totall Quantity Sold : {totalQuantity}</div>
            <div className="text-black font-semibold text-xl">Totall Price : {totalPrice}</div>
          </div>
        </div>
}
      </div>
    </div>
  );
};

export default HistoryScreen;
