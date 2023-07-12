import React from "react";
import {Link} from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#00727A]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-[#D93F33] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link to={"/"} className="relative mt-5 inline-block text-sm font-medium text-[#D93F33] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="relative block px-8 py-3 bg-[#F5F5F7] border border-current">
            Go Home
          </span>
      </Link>
    </div>
  );
};
