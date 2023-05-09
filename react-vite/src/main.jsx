import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import './assets/styles/main.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {InvoiceProvider} from "./context/InvoiceContext.jsx";
import {InvoiceProductProvider} from "./context/InvoiceProduct.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <InvoiceProvider>
        <InvoiceProductProvider>
          <ProductProvider>
            <CartProvider>
              <RouterProvider router={router}/>
            </CartProvider>
          </ProductProvider>
        </InvoiceProductProvider>
      </InvoiceProvider>
    </AuthContext>
  </React.StrictMode>,
)




