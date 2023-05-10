import {Navigate, Outlet} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Footer} from "../components/Footer.jsx";
import {LandingNavBar} from "../components/LandingNavBar.jsx";
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";

export const LandingLayout = () => {
  const {setUser} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  }, []);
  return (
    <>
      <div className="h-screen overflow-hidden">
        <LandingNavBar />
        <Outlet/>
        <Footer />
      </div>
    </>
  );

};
