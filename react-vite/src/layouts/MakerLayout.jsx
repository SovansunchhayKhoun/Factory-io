import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
export const MakerLayout = () => {
  return (
    <>
      <NavBar />
        <Outlet />
      <Footer />
    </>
  );
};
