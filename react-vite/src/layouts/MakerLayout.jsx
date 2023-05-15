import {NavBar} from "../components/NavBar.jsx";
import { Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useContext, useEffect} from "react";
import InvoiceContext from "../context/InvoiceContext.jsx";
import axiosClient from "../axios-client.js";

export const MakerLayout = () => {
  const {setUser} = useAuthContext()
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data})=>{
        setUser(data)
      })
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-auto">
        <NavBar/>
          <Outlet/>
        <Footer/>
      </div>
    </>
  );
};
