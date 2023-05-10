import {Link} from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer
        className="w-full absolute bottom-0 bg-whiteFactory flex items-center justify-between px-48 py-6 border">
        <div className="flex items-center gap-x-2">
          <div>
            <Link to="#to-factory">
              <img width="130" src="/assets/images/factory.png" alt=""/>
            </Link>
          </div>
          <button className="px-5 py-1 text-whiteFactory bg-redBase rounded-[20px]">Donate</button>
        </div>
        <div className="flex items-center">
        <span className="mr-3">
          Follow us on:
        </span>
          <Link to="https://www.facebook.com/SolutionOfDigital?mibextid=LQQJ4d">
            <img className="mr-3" width="32" src="/assets/images/facebook-icon.png" alt=""/>
          </Link>
          <Link to="https://www.linkedin.com/company/factory-io/">
            <img className="mr-3" width="32" src="/assets/images/linkedin-icon.png" alt=""/>
          </Link>
          <Link to="https://www.tiktok.com/@factory.io?_t=8c9CGPPLRS6&_r=1">
            <img className="mr-3" width="32" src="/assets/images/tiktok-icon.png" alt=""/>
          </Link>
        </div>
      </footer>
    </>
  );
};
