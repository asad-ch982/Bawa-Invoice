import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect,useState } from "react";
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

const App = () => {
  const { initialSetData } = useInitApp();
const [AppOn, setAppOn] = useState(false)
const [email, setEmail] = useState('')
const [pass, setpass] = useState('')

  useEffect(() => {

      const code =  localStorage.getItem("CODE")
      if (code ==="saifi") {
        setAppOn(true)
        initialSetData();
     }

   
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onchange = (e)=>{
    if (e.target.name == 'email') {
     setEmail(e.target.value)
   }

 
 }
 const clicked =()=>{
  if (email === "saifi") {
    localStorage.setItem('CODE',email)
    initialSetData();
    setAppOn(true)

  }
 }

  return (
    <>{!AppOn && <div className="">
       <div className="w-1/3 mx-auto mt-20 items-center">
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
          Bawa Vapes  Admin Panel
          </motion.span>
        </div>

    <div className="mt-8 mx-44">
                <input
                onChange={onchange}
                value={email}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className=" text-center rounded-md border border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-700 focus:outline-none focus:ring-blue-600 sm:text-sm"
                  placeholder="SECURITY CODE"
                />
                </div>
              <div>

              <button onClick={clicked}
      text="Sign in"
      className="px-6 py-2 mt-2 border-blue-600 text-white bg-blue-600 rounded-2xl  border mx-56 "
      // loading={showLoader}
      // disabled={showLoader}
    >Sign in</button>
    </div>
    </div>
     

      </div>
     
      }
   {AppOn && <BrowserRouter>
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
}
    </>
  );
};

export default App;
