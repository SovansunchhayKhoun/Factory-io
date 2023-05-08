import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect} from "react";
import AxiosClient from "../axios-client.js";

export const LandingNavBar = () => {
  const {user,setUser, token,onLogout} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  },[])

  return (
    <>
      <nav className="sticky top-0 bg-white z-100 mb-12 flex px-4 py-4 justify-between items-center">
        <Link to="/" className="ml-6">
          <img className="w-30 h-4" src="/assets/images/factory.png" alt=""/>
        </Link>

        <div className="flex items-center gap-x-7 h-8">
          <div className="highlight-hover text-[#3C3C3C]">
            <Link to="/">
              Home
            </Link>
          </div>
          <div className="highlight-hover text-[#3C3C3C]">
            <Link to="/CommunityLanding">
              Community
            </Link>
          </div>
          <div className="highlight-hover text-[#3C3C3C]">
            <Link to="/RnDLanding">
              R&D
            </Link>
          </div>
          <div className="highlight-hover text-[#3C3C3C]">
            <Link to="/ContestLanding">
              Contest
            </Link>
          </div>
          <div>
            <Link to="/maker-io">
              <img width="100" src="/assets/images/makerio.png" alt=""/>
            </Link>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          {
            token ? (
                <>
                  <div className="mr-1">
                    <Link to={`/maker-io/user/${user.id}`} className="highlight-hover text-[#3C3C3C]">
                      {user?.firstName}
                    </Link>
                  </div>
                  <div className="mr-1">
                    <a onClick={onLogout} className="highlight-hover text-[#3C3C3C]" >
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
