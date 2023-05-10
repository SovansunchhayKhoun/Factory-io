import {NavBar} from "../components/NavBar.jsx";
import { Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useContext, useEffect} from "react";
import InvoiceContext from "../context/InvoiceContext.jsx";

export const MakerLayout = () => {
  const {setUser} = useAuthContext()
  // const {invoices} = useContext(InvoiceContext);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
    // getInvoices();
  }, []);

  return (
    <>
      <NavBar/>
        <Outlet/>
      <Footer/>
    </>
  );
};
