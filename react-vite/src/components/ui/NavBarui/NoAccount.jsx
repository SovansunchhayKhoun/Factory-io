import {Link} from "react-router-dom";
import React from "react";

export const NoAccount = () => {
    return (
        <>
          <div
            className="flex justify-center items-center md:gap-x-2 md:px-2 md:py-1 gap-x-1 transition duration-500 cursor-pointer text-tealHover hover:text-whiteFactory hover:bg-tealBase rounded-md font-semibold">
            <Link className="whitespace-nowrap" to="/login">
              Sign in
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="md:w-8 md:h-8 w-7 h-7">
              <path className="" strokeLinecap="round" strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </>
    );
};
