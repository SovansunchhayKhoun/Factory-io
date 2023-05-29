import {Link} from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#00727A]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-[#D93F33] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a
          className="relative inline-block text-sm font-medium text-[#D93F33] group active:text-orange-500 focus:outline-none focus:ring"
        >
        <span
          className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#D93F33] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

          <span className="relative block px-8 py-3 bg-[#F5F5F7] border border-current">
          <Link to="/">Go Home</Link>
        </span>
        </a>
      </button>
    </div>
  );
};
