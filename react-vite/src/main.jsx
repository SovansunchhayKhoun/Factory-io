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
import {InvoiceProductProvider} from "./context/InvoiceProductContext.jsx";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import {UserProvider} from "./context/UserContext.jsx";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthContext>
<<<<<<< HEAD
        <UserProvider>
          <InvoiceProvider>
            <InvoiceProductProvider>
              <ProductProvider>
                <CartProvider>
                  <RouterProvider router={router}/>
                </CartProvider>
              </ProductProvider>
            </InvoiceProductProvider>
          </InvoiceProvider>
        </UserProvider>

=======
        <InvoiceProductProvider>
          <InvoiceProvider>
            <ProductProvider>
              <CartProvider>
                <RouterProvider router={router}/>
              </CartProvider>
            </ProductProvider>
          </InvoiceProvider>
        </InvoiceProductProvider>
>>>>>>> 8e20bf3435be8f809ce89f4a7e664f36e796c1b5
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>,
)




