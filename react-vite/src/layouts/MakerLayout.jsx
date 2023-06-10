import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {lazy, Suspense, useContext, useEffect} from "react";
import axiosClient from "../axios-client.js";
import ChatContext from "../context/ChatContext.jsx";
import UserContext from "../context/UserContext.jsx";
import {Spinner} from "flowbite-react";
import InvoiceProductContext from "../context/InvoiceProductContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";
import {useJsApiLoader} from "@react-google-maps/api";
import CartContext from "../context/CartContext.jsx";

export const MakerLayout = () => {
  const {setUser, token, setIsLoading,setToken} = useAuthContext()

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
          setIsLoading(false)
        }).catch((e) => {
        if (e.response.status === 401) {
          setIsLoading(false);
          setUser({})
          setToken(null);
        }
      })
    }
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-auto">
        <NavBar/>
        <main className="
          min-[1920px]:px-36
          xl:pb-8
          lg:px-16
          md:px-6 md:pt-24 md:pb-2
          pb-6 px-6 pt-16">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  );
};
