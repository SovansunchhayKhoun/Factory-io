import {useAuthContext} from "../context/AuthContext"
import {Link, Navigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";

export const UserView = () => {
  const {token} = useAuthContext()
  useEffect(() => {
    axiosClient.get('/users').then(({data}) => {
      console.log(data)
    })
  },[])


  const {user} = useAuthContext()
  const [isDisabled, setIsDisabled] = useState(true);
  const handleClick = () => {
    setIsDisabled(!isDisabled)
    console.log(user)
  };
  if (!token){
    return <Navigate to="/"/>
  }
  return (
    <>
      <form >
        <div className="flex items-center justify-center h-1/2 flex-col">
          <h1 className="mb-[25px] font-semibold text-2xl">{user.firstName} {user.lastName}</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="flex mb-2 w-[500px] gap-5">
              <div className="w-1/2">
                <label className="text-sm">First Name</label>
                <input type="text" id="firstName"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder={user.firstName}
                       disabled={isDisabled}
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm">Last name</label>
                <input type="name" id="lastName"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder={user.lastName}
                       disabled={isDisabled}
                />
              </div>
              <div className="w-1/3">
                <label className="text-sm">Gender</label>
                <input type="name" id="gender"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder={user['gender']}
                       disabled={isDisabled}
                />
              </div>
            </div>
            <div className="mb-2 w-[500px]">
              <label className="text-sm">Phone Number</label>
              <input type="name" id="phoneNumber"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder={user.phoneNumber}
                     disabled={isDisabled}
              />
            </div>
            <div className="mb-2 w-[500px]">
              <label className="text-sm">Email</label>
              <input type="email" id="email"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder={user.email}
                     disabled={isDisabled}
              />
            </div>
            <div className="mb-6 w-[500px]">
              <label className="text-sm">Password</label>
              <input type="password" id="password"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder={user.password}
                     disabled={isDisabled}
              />
            </div>
            <div className="mb-6 w-[500px]">
              <input type="password" id="confpassword"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder={user.firstName}
                     disabled={isDisabled}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-[125px]">
            <div>
              <button
                className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                type="button"
                onClick={handleClick}
              >
                Edit
              </button>
            </div>
            <div className="flex gap-x-1">
              <p>Already a member?</p>
              <Link to="/login"
                    className="text-tealHover font-bold"
              >Log in
              </Link>
            </div>
          </div>
        </div>
      </form>

    </>

  )
}
