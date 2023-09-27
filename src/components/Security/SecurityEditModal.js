
/* eslint-disable no-useless-escape */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getEditedIdForm,getAllAuthentication ,onConfirmEditAuth, setEditedId} from "../../store/authSlice";
import ImageUpload from "../Common/ImageUpload";
import {
  defaultInputInvalidStyle,
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../../constants/defaultStyles";
import EyeCloseIcon from "../Icons/EyeCloseIcon";

const emptyForm = {
  password: "",
  ID: "",
  type: "",
};

function SecurityEditModal(props) {
  const dispatch = useDispatch();
  const editedID = useSelector(getEditedIdForm);
  const products = useSelector(getAllAuthentication);
  const [animate, setAnimate] = useState(true);
  const [password, setPassword] = useState("password")
  const [productForm, setProductForm] = useState(emptyForm);
  const [isTouched, setIsTouched] = useState(false);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );

  const onEditHandler = useCallback(() => {
    setIsTouched(true);
    const isValid = Object.keys(validForm).every((key) => validForm[key]);

    if (!isValid) {
      toast.error("Invalid  Form!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Wow Successfully Update Authentication!", {
      position: "bottom-center",
      autoClose: 2000,
    });

    dispatch(onConfirmEditAuth(productForm));
    setIsTouched(false);
  }, [dispatch, validForm, productForm]);

  const handlerProductValue = useCallback((event, keyName) => {
    const value = event.target.value;

    setProductForm((prev) => {
      return { ...prev, [keyName]: value };
    });
  }, []);



  const onCancelHandler = useCallback(() => {
    dispatch(setEditedId(null));
  }, [dispatch]);


const handleEye =()=>{
    if (password==="password") {
        setPassword("text")
    }else if (password==="text") {
        setPassword("password")
    }
}
  useEffect(() => {
      setValidForm((prev) => ({
        ID: true,
        password: true,
        type: true
      }));
  }, [productForm]);

  useEffect(() => {
    if (editedID !== null) {
      setAnimate(true);
      const isFindIndex = products.findIndex(
        (client) => client._id === editedID
      );
      if (isFindIndex !== -1) {
        setProductForm({ ...products[isFindIndex] });
      }
    } else {
      setAnimate(false);
    }
  }, [products, editedID]);

  return editedID !== null ? (
    <motion.div
      className="modal-container"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: animate ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 18,
      }}
    >
      <div className="relative">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Edited User Form
                    </h3>
                    <div className="mt-2">
                      {/*  */}
                      <div className="bg-white rounded-xl mt-4">
                     
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                           User ID
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Product Name"
                                type="text"
                                className={
                                  !validForm.name && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={productForm.ID}
                                onChange={(e) => handlerProductValue(e, "ID")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                           Type
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Product Name"
                                type="text"
                                readOnly
                                className={
                                  !validForm.name && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={productForm.type}
                                onChange={(e) => handlerProductValue(e, "type")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Password
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Amount"
                                type={password}
                                className={
                                  !validForm.amount && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={productForm.password}
                                onChange={(e) =>
                                  handlerProductValue(e, "password")
                                }
                              >
                           
                                </input>
                                <div   onClick={handleEye} className="flex justify-end text-gray-400 hover:text-gray-600 cursor-pointer" >Show Password </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onEditHandler}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onCancelHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
}

export default SecurityEditModal;