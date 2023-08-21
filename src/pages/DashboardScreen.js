import React, { useCallback ,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/Common/PageTitle";
import DashboardWidgets from "../components/Dashboard/DashboardWidgets";
import InvoiceIcon from "../components/Icons/InvoiceIcon";
import Button from "../components/Button/Button";
import QuickEditCompany from "../components/Dashboard/QuickEditCompany";
import ClientTable from "../components/Clients/ClientTable";
import InvoiceTable from "../components/Invoice/InvoiceTable";
import CustomInvoice from "../components/CustomInvoice/CustomInvoice";

function DashboardScreen() {
  const navigate = useNavigate();
  const [seed, setSeed] = useState(1)
const reset =()=>{
  setSeed(Math.random())
}
// useEffect(() => {
//   reset()
// }, [])

  const goToNewInvoice = useCallback(() => {
    navigate("/invoices/new");
  }, [navigate]);

  return (
    <div>
      <div className="p-4">
        <PageTitle title="Dashboard" />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/6 pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          <DashboardWidgets />
          <div className="mt-1">
            <InvoiceTable key={seed} />
          </div>
          <div className="mt-4">
            <ClientTable />
          </div>
        </div>
        <div className="w-full lg:w-2/6 pl-4 pr-4 sm:pl-4 sm:pr-2">
          <div>
            <Button onClick={goToNewInvoice} block={1}>
              <InvoiceIcon />
              <span className="inline-block ml-2"> Add New Invoice </span>
            </Button>
          </div>

          <QuickEditCompany isShowDetail={false} />
          <div className="mt-4">
        <CustomInvoice reset={reset}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
