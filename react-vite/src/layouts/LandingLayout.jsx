import {Navigate, Outlet} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Footer} from "../components/Footer.jsx";
import {LandingNavBar} from "../components/LandingNavBar.jsx";
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axiosClient from "../axios-client.js";

export const LandingLayout = () => {
  const {setUser} = useAuthContext()
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data})=>{
        setUser(data)
      })
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <LandingNavBar />
        <Outlet/>
        <Footer />
      </div>
    </>
  );

};
