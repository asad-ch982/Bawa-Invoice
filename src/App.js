import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import DashboardScreen from "./pages/DashboardScreen";
import ClientListScreen from "./pages/clients/ClientListScreen";
import ProductListScreen from "./pages/products/ProductListScreen";
import InvoiceListScreen from "./pages/invoices/InvoiceListScreen";
import InvoiceDetailScreen from "./pages/invoices/InvoiceDetailScreen";
import AboutScreen from "./pages/about/AboutScreen";
import Container from "./components/Container/Container";
import useInitApp from "./hook/useInitApp";
import ClientDeleteConfirm from "./components/Clients/ClientDeleteConfirm";
import ClientEditModal from "./components/Clients/ClientEditModal";
import ProductDeleteConfirm from "./components/Product/ProductDeleteConfirm";
import ProductEditModal from "./components/Product/ProductEditModal";
import ClientChooseModal from "./components/Clients/ClientChooseModal";
import ProductChoosenModal from "./components/Product/ProductChoosenModal";
import InvoiceSettingModal from "./components/Invoice/InvoiceSettingModal";
import InvoiceConfirmModal from "./components/Invoice/InvoiceConfirmModal";
import InvoiceDeleteConfirm from "./components/Invoice/InvoiceDeleteConfirm";
import PageLoading from "./components/Common/PageLoading";
import { motion } from "framer-motion";
import InvoiceNavbarLoading from "./components/Loading/InvoiceNavbarLoading";
import { useDispatch, useSelector } from "react-redux";
import { getAuthNo, setAuthNo } from "./store/authSlice";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const dispatch = useDispatch();
  const { initLoading, showNavbar, toggleNavbar, setEscapeOverflow } =
    useAppContext();
  const { initialSetData } = useInitApp();
  const [AppOn, setAppOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [pass, setpass] = useState("");
  const authNo = useSelector(getAuthNo);
  const clicked = async () => {
    setEscapeOverflow(true);
    const response = await fetch("https://invoice-data.vercel.app/getauth", {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ID: email ,password:password}),
    });

    const json = await response.json();
    if (json.type === "SALESMAN" || json.type === "ADMIN") {
      localStorage.setItem("Token", JSON.stringify(json.token));
      dispatch(setAuthNo(json));
      initialSetData();
      setEscapeOverflow(false);
      setLoading(false);
      setAppOn(true);
    } else {
      setEscapeOverflow(false);
      alert("WRONG AUTHENTICATION");
    }
  };
  const check = async (token) => {
    const response = await fetch("https://invoice-data.vercel.app/verifyauth", {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    const json = await response.json();
    if (json.type === "SALESMAN" || json.type === "ADMIN") {
      localStorage.setItem("Token", JSON.stringify(json.token));
      dispatch(setAuthNo(json));
      initialSetData();
      setEscapeOverflow(false);
      setAppOn(true);
    } else {
      setEscapeOverflow(false);
      alert("WRONG AUTHENTICATION");
    }
  };

  useEffect(() => {
    console.log(process.env.PROXY)
    console.log(process.env.REACT_APP_PROXY)
    const token = localStorage.getItem("Token");
    if (token) {
      setEscapeOverflow(true);
      const code = JSON.parse(token);
      check(code);
    } else if (!token) {
      setLoading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }else if(e.target.name === "password"){
      setPassword(e.target.value);
    }
  };

  return (
    <>
      {" "}
      <PageLoading />
      {loading && (
        <div className="">
          <div className="md:w-1/3 mx-auto mt-20 items-center">
            <div className="text-center">
              <motion.span
                className="font-bold font-title text-2xl sm:text-2xl p-2 text-center  items-center"
                initial={{
                  translateX: -300,
                }}
                animate={{
                  translateX: -40,
                  color: "#0066FF",
                }}
                transition={{
                  type: "spring",
                  damping: 18,
                }}
              >
                <span className="nav-loading">
                  <InvoiceNavbarLoading loop />
                </span>
                Bawa Vapes Admin Panel
              </motion.span>
            </div>

            <div className=" mt-4 mx-10">
              <input
                onChange={onchange}
                value={email}
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required={true}
                className=" text-center rounded-md w-full border-4 border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="USER ID"
              />
              <input
                onChange={onchange}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required={true}
                className=" text-center rounded-md w-full mt-2 border-4 border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="PASSWORD"
              />
            </div>
            <div className="mx-10">
              <button
                onClick={clicked}
                text="Sign in"
                className="px-6 py-2 mt-2 border-blue-600 text-white bg-blue-600 rounded-md  border w-full"
                // loading={showLoader}
                // disabled={showLoader}
              >
                Sign in
              </button>
            </div>
          </div>
          <PageLoading />
        </div>
      )}
      {AppOn && (
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/" element={<DashboardScreen />} />

              <Route path="clients" element={<ClientListScreen />}></Route>

              <Route path="products" element={<ProductListScreen />}></Route>

              <Route path="invoices">
                <Route path="" element={<InvoiceListScreen />} exact />
                <Route path=":id" element={<InvoiceDetailScreen />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
          <ToastContainer />
          <ClientDeleteConfirm />
          <ClientEditModal />
          <ClientChooseModal />
          <ProductDeleteConfirm />
          <ProductEditModal />
          <ProductChoosenModal />
          <InvoiceSettingModal />
          <InvoiceConfirmModal />
          <InvoiceDeleteConfirm />
          <PageLoading />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
