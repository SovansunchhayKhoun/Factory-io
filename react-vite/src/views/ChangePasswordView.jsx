import React, {useContext, useEffect} from "react";
import userContext from "../context/UserContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";

export const ChangePasswordView = () => {
  const {user} = useAuthContext()
  const {getUser,formValues,onChange,updatePassword,errors,isLoading} = useContext(userContext)
  useEffect(() => {
    getUser(user.id)
  },[])
  const navigate = useNavigate();
  if(!isLoading){
    return (
      <>
        <form className="">
          <button onClick={(e)=>{
            e.preventDefault();
            navigate(-1)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </button>
          <div className="flex items-center justify-center flex-col">
            <div className="font-bold mb-6">Change Password</div>
            {errors?.data && <span className="bg-red-600 px-4 py-4 rounded-md text-sm text-white">{errors?.data.message}</span>}

            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 w-[500px]">
                <label className="text-sm">Old password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                  value={formValues['password']}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2 w-[500px]">
                <label className="text-sm">New Password</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                  value={formValues['new_password']}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2 w-[500px]">
                <label className="text-sm">Confirm new password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                  value={formValues['password_confirmation']}
                  onChange={onChange}
                />
              </div>
              <div>
                <button
                  onClick={updatePassword}
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
}
