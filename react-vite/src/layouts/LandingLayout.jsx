import {Outlet} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Footer} from "../components/Footer.jsx";
import {LandingNavBar} from "../components/LandingNavBar.jsx";

export const LandingLayout = () => {
    return (
        <>
          <LandingNavBar />
            <Outlet/>
          {/*<Footer />*/}
        </>
    );
};
