import {useAuthContext} from "../context/AuthContext"
import {Link, Navigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../context/UserContext.jsx";

export const AdminView = () => {
  const {token} = useAuthContext()
  const {getAdmin, formValues, admin, isLoading, onChange, updateAdmin, errors, setErrors,changeAdminPassword} = useContext(UserContext)
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordView, setPasswordView] = useState(true)
  // const [oldPassword,setOldPassword] = useState('')
  // const [newPassword,setNewPassword] = useState('')
  // const [confPassword,setConfPassword] = useState('')
  const handleClick = () => {
    setIsDisabled(!isDisabled)
  };

  const handleSubmit = (e) => {
    changeAdminPassword(e,admin.id)
  }

  useEffect(() => {
    setErrors({})
    setIsDisabled(true)
    setPasswordView(true)
    getAdmin()
  }, [])
  if (!token) {
    return <Navigate to="/"/>
  }
  if (!isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-1/2 flex-col">
          <img className="w-[150px] mb-5" src="/assets/images/pngegg.png"/>
          <h1 className="uppercase mb-[25px] font-semibold text-2xl">{admin.username}</h1>
          <div className={`flex flex-col items-center justify-center ${passwordView && 'hidden'}`}>
            {errors?.data && <span className="bg-red-600 px-4 py-4 rounded-md text-sm text-white mb-2">{errors?.data.message}</span>}
            <div className="flex flex-col mb-2 w-[500px] gap-5">
              <div>
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
              <div>
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
              <div>
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
              <div className="flex justify-between items-center w-full">
                <button
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                  onClick={e => setPasswordView(!passwordView)}
                >
                  Cancel
                </button>
                <button
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                  onClick={e => handleSubmit(e)}
                >
                  Change
                </button>
              </div>
            </div>



          </div>
          <div className={`flex flex-col items-center justify-center ${!passwordView && 'hidden'}`}>
            {errors?.data &&
              <span className="px-4 py-4 rounded-md bg-red-500 text-white text-sm mb-2">{errors?.data.message}</span>}
            <div className="flex mb-2 w-[500px] gap-5">
              <div className="w-1/2">
                <label className="text-sm">First Name</label>
                <input type="firstName" name="firstName" id="firstName"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['firstName']}
                       onChange={onChange}
                       disabled={isDisabled}
                       required/>
              </div>
              <div className="w-1/2">
                <label className="text-sm">Last name</label>
                <input type="lastName" id="lastName" name="lastName"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['lastName']}
                       onChange={onChange}
                       disabled={isDisabled}
                       required
                />
              </div>
              <div className="w-1/3">
                <label className="text-sm">Gender</label>
                <input type="name" id="gender" name="gender"
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['gender']}
                       onChange={onChange}
                       disabled={isDisabled}
                />
              </div>
            </div>
            <div className="mb-2 w-[500px]">
              <label className="text-sm">Phone Number</label>
              <input id="phoneNumber"
                     name="phoneNumber"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['phoneNumber']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            <div className="mb-2 w-[500px]">
              <label className="text-sm">Email</label>
              <input type="email" id="email"
                     name="email"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['email']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            <div className="mb-6 w-[500px]">
              <label className="text-sm">Username</label>
              <input type="name" id="userName"
                     name="username"
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['username']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            <div className="flex justify-between items-center gap-16">
              <div className="text-tealHover hover:underline hover:cursor-pointer" onClick={(e) => {
                e.stopPropagation()
                setPasswordView(!passwordView)
              }}>Change Password
              </div>
              {isDisabled ?
                <button
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                  type="button"
                  onClick={handleClick}
                >
                  Edit
                </button>
                :
                <div className="flex gap-4">
                  <button
                    className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                    type="button"
                    onClick={() => {
                      handleClick()
                      location.reload()
                    }}
                  >
                    Cancel
                  </button>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    updateAdmin(e, admin.id)
                  }}
                          className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                    Update
                  </button>
                </div>
              }
            </div>

          </div>
        </div>
      </>
    )
  }

}
