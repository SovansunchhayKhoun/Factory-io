import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import './assets/styles/main.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContext>
            <ProductProvider>
              <CartProvider>
                <RouterProvider router={router}/>
              </CartProvider>
            </ProductProvider>
        </AuthContext>
    </React.StrictMode>,
)




