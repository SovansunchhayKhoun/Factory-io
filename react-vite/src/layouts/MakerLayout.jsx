import {NavBar} from "../components/NavBar.jsx";
import { Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect} from "react";

export const MakerLayout = () => {
  const {setUser} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  }, []);
  return (
    <>
      <NavBar/>
      <Outlet/>
       <Footer/>
    </>
  );
};
