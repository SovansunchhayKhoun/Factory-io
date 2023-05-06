import {Link} from "react-router-dom";
import {useContext} from "react";
import ProductContext from "../context/ProductContext.jsx";

export const LandingNavBar = () => {

  return (
    <nav className="sticky top-0 bg-white z-100 mb-12 flex px-4 py-4 justify-between items-center">
      <Link to="/makerio" className="ml-6">
        <img className="w-30 h-4" src="/assets/images/factory.png" alt=""/>
      </Link>

      <div className="flex items-center gap-x-7 h-8">
        <div className="highlight-hover text-[#3C3C3C]">
          <Link to="/makerio">
            Home
          </Link>
        </div>
        <div className="highlight-hover text-[#3C3C3C]">
          <Link to="/community">
            Community
          </Link>
        </div>
        <div className="highlight-hover text-[#3C3C3C]">
          <Link to="/research">
            R&D
          </Link>
        </div>
        <div className="highlight-hover text-[#3C3C3C]">
          <Link to="/contest">
            Contest
          </Link>
        </div>
        <div>
          <Link to="makerio.html">
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
  );
};

export const NavBar = () => {
  const {cartItem} = useContext(ProductContext);
  return (
    <nav className="z-50 sticky top-0 bg-white z-100 mb-12 flex px-36 py-4 justify-between items-center">
      <Link to="">
        <img width="100" src="/assets/images/makerio.png" alt=""/>
      </Link>

      <div className="flex items-center gap-x-12">
        <div className="highlight-hover text-[#8A0000]">
          <Link to="">
            Home
          </Link>
        </div>
        <div>
          <Link to="#factory-io">
            <img width="100" src="/assets/images/factory.png" alt=""/>
          </Link>
        </div>
        <div className="highlight-hover relative">
          <Link to="/maker-io/cart">
            Cart
          </Link>
          <span
            className={cartItem.length === 0 ? 'hidden' : " absolute top-[-10px] right-[-24px] bg-redBase text-whiteFactory px-2 py-1 rounded-3xl text-xs"}>
            {cartItem.reduce((total, i) => total = i.qty, 0)}
          </span>
        </div>
        <div className="highlight-hover">
          <Link to="#order">
            Order
          </Link>
        </div>
      </div>

      <div className="flex">
        <div className="mr-6">
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
  );
};
