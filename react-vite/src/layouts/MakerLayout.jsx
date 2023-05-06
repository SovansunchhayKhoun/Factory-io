import {Link} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {MakerLanding} from "../views/MakerLanding.jsx";
export const MakerLayout = () => {

  return (
    <>
      <NavBar />
        <Outlet />
      <Footer />
    </>
  );
};
