import {Link} from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer
        className="w-full border mt-auto bg-whiteFactory flex items-center justify-between
        xl:px-24 xl:py-4
        lg:px-12 lg:py-3
        md:px-8 md:py-3
        px-4 py-2">
        <div className="flex items-center gap-x-2">
          <div>
            <Link to="#to-factory">
              <img className="xl:w-[130px] lg:w-[120px] md:w-[110px] w-[100px]" src="/assets/images/factory.png" alt=""/>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
        <span className="mr-3">
          Follow us on:
        </span>
          <Link to="https://www.facebook.com/SolutionOfDigital?mibextid=LQQJ4d">
            <img className="mr-3 xl:w-[32px] lg:w-[24px] md:w-[12px] w-[24px]" src="/assets/images/facebook-icon.png" alt=""/>
          </Link>
          <Link to="https://www.linkedin.com/company/factory-io/">
            <img className="mr-3 xl:w-[32px] lg:w-[24px] md:w-[12px] w-[24px]" src="/assets/images/linkedin-icon.png" alt=""/>
          </Link>
          <Link to="https://www.tiktok.com/@factory.io?_t=8c9CGPPLRS6&_r=1">
            <img className="mr-3 xl:w-[32px] lg:w-[24px] md:w-[12px] w-[24px]" src="/assets/images/tiktok-icon.png" alt=""/>
          </Link>
        </div>
      </footer>
    </>
  );
};
