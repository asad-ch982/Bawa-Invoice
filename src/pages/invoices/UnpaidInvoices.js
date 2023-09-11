import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/Common/PageTitle";
import InvoiceIcon from "../../components/Icons/InvoiceIcon";
import InvoiceTable from "../../components/Invoice/InvoiceTable";
import UnpaidTable from "../../components/Invoice/UnpaidTable";

const UnpaidInvoices = () => {
    const navigate = useNavigate();

    const goToNewInvoice = useCallback(() => {
      navigate("/invoices/new");
    }, [navigate]);
  return (
   <>
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap p-4">
        <div className="sm:mr-4">
          <PageTitle title="Unpaid Invoices" />
        </div>
   
      </div>

      <div className="flex flex-wrap">
        <div className="w-full px-4 mb-4 sm:mb-1">
          <UnpaidTable showAdvanceSearch />
        </div>
      </div>
    </div>
   </>
  )
}

export default UnpaidInvoices
