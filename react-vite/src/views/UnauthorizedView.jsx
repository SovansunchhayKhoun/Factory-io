import {NavLink} from "react-router-dom";

export const UnauthorizedView = () => {
    return (
      <div className="bg-gradient-to-r from-red-800 to-blue-800">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-8xl font-bold text-red-800">Not Authorized</h1>
              <h1 className="text-5xl font-medium py-8">OOPS! You are not Authorized</h1>
              <p className="text-m pb-8 px-12 font-medium">You are not authorized to access this page, Please click
                button below to go back. Sorry for inconvenience.</p>
              <NavLink to="/">
                <button
                  className="bg-gradient-to-r from-red-800 to-blue-800 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                  HOME
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
}
