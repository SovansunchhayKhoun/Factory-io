import {Link} from "react-router-dom";
export const LandingNavBar = () => {
    return (
        <>
          <nav className="sticky top-0 bg-white z-100 mb-12 flex px-4 py-4 justify-between items-center">
            <Link to="/" className="ml-6">
              <img className="w-30 h-4" src="/assets/images/factory.png" alt=""/>
            </Link>

            <div className="flex items-center gap-x-7 h-8">
              <div className="highlight-hover text-[#3C3C3C]">
                <Link to="#home">
                  Home
                </Link>
              </div>
              <div className="highlight-hover text-[#3C3C3C]">
                <Link to="#">
                  Community
                </Link>
              </div>
              <div className="highlight-hover text-[#3C3C3C]">
                <Link to="R&Dland.html">
                  R&D
                </Link>
              </div>
              <div className="highlight-hover text-[#3C3C3C]">
                <Link to="#">
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
              <div className="mr-1">
                <Link to="#sign-in">
                  Sign in
                </Link>
              </div>
              <div>
                <Link to="#sign-up">
                  Sign up
                </Link>
              </div>
            </div>
          </nav>
        </>
    );
};
