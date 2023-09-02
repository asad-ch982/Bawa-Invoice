import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clientSlice";
import productRedicer from "./productSlice";
import companyReducer from "./companySlice";
import invoiceReducer from "./invoiceSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    company: companyReducer,
    products: productRedicer,
    invoices: invoiceReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
