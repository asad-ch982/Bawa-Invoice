import React from 'react'
import PageTitle from "../../components/Common/PageTitle";
import ProductTable from "../../components/Product/ProductTable";
import QuickAddProduct from "../../components/Product/QuickAddProduct";
const ClosingScreen = () => {
  return (
    <div>
    <div className="p-4">
      <PageTitle title="Closing" />
    </div>

    <div className="pr-4">
      <div className="w-full  pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
        <ProductTable showAdvanceSearch />
      </div>
    </div>
  </div>
  )
}

export default ClosingScreen
