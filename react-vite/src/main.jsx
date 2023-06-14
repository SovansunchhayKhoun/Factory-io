import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./assets/styles/main.css";
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {InvoiceProvider} from "./context/InvoiceContext.jsx";
import {InvoiceProductProvider} from "./context/InvoiceProductContext.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ChatProvider} from "./context/ChatContext.jsx";
import {GoogleMapsProvider} from "./context/GoogleMapsContext.jsx";
<<<<<<< HEAD
import {ProjectContext} from "./context/Factory/ProjectContext.jsx";
=======
>>>>>>> 9b6c7d1a8934a62cd1ba4fc800b86b3f6e7b737d

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthContext>
        <UserProvider>
          <GoogleMapsProvider>
            <ProjectContext>
              <ChatProvider>
                <InvoiceProductProvider>
                  <InvoiceProvider>
                    <ProductProvider>
                      <CartProvider>
                        <RouterProvider router={router}/>
                      </CartProvider>
                    </ProductProvider>
                  </InvoiceProvider>
                </InvoiceProductProvider>
              </ChatProvider>
            </ProjectContext>
          </GoogleMapsProvider>
        </UserProvider>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>
);
