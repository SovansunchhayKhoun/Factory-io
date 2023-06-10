import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import AxiosClient from "../axios-client.js";

export const LandingNavBar = () => {
  const {user, setUser, token, onLogout} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  }, [])

  const [navBar, setNavBar] = useState([
    {name: "Home", to: "factoryio", img: {imgSrc: "", imgWidth: 0}},
    {name: "Community", to: "factoryio/community", img: {imgSrc: "", imgWidth: 0}},
    {name: "R&D", to: "factoryio/rd", img: {imgSrc: "", imgWidth: 0}},
    {name: "Contest", to: "factoryio/contest", img: {imgSrc: "", imgWidth: 0}},
    {name: "", to: "/", img: {imgSrc: "/assets/images/makerio.png", imgWidth: 100}},
  ]);

  return (
    <>
      <nav className="fixed top-0 w-full bg-whiteFactory z-50 flex justify-between items-center
        min-[1920px]:px-36 min-[1920px]:py-4
        lg:px-16 lg:py-3
        md:px-6 md:py-2
        px-6 py-2
      ">
        <Link to="/" className="">
          <img className="lg:w-[120px] md:w-[120px] w-[100px]" src="/assets/images/factory.png" alt=""/>
        </Link>

        <div className="flex items-center gap-x-7 h-8">

          {/*<div className="highlight-hover text-[#3C3C3C]">*/}
          {/*  <Link to="/factoryio">*/}
          {/*    Home*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*<div className="highlight-hover text-[#3C3C3C]">*/}
          {/*  <Link to="/CommunityLanding">*/}
          {/*    Community*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*<div className="highlight-hover text-[#3C3C3C]">*/}
          {/*  <Link to="/RnDLanding">*/}
          {/*    R&D*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*<div className="highlight-hover text-[#3C3C3C]">*/}
          {/*  <Link to="/ContestLanding">*/}
          {/*    Contest*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <Link to="/maker-io">*/}
          {/*    <img width="100" src="/assets/images/makerio.png" alt=""/>*/}
          {/*  </Link>*/}
          {/*</div>*/}

          {navBar.map(item => {
            return (
              <>
                <div className={`${!item.name && 'hidden'} highlight-hover text-[#3C3C3C]`}>
                  <Link to={`/${item.to}`}>
                    {item.name}
                  </Link>
                </div>
                <div className={`${!item.img.imgSrc && 'hidden'}`}>
                  <Link to="/maker-io">
                    <img width={`${item.img.imgWidth}`} src={`${item.img.imgSrc}`} alt=""/>
                  </Link>
                </div>
              </>
            )
          })}
        </div>
        <div className="flex justify-end gap-x-2">
          {
            token ? (
                <>
                  <div className="mr-1">
                    <Link to={`/maker-io/user/${user?.id}`} className="highlight-hover text-[#3C3C3C]">
                      {user?.firstName}
                    </Link>
                  </div>
                  <div className="mr-1">
                    <a onClick={onLogout} className="highlight-hover text-[#3C3C3C]">
                      Logout
                    </a>
                  </div>
                </>
              ) :
              <>
                <div className="mr-1">
                  <Link to="/login" className="highlight-hover text-[#3C3C3C]">
                    Sign in
                  </Link>
                </div>
                <div>
                  <Link to="/signup" className="highlight-hover text-[#3C3C3C]">
                    Sign up
                  </Link>
                </div>
              </>
          }

        </div>
      </nav>
    </>
  );
};
