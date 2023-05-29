import {useAuthContext} from "../context/AuthContext"
import {Link, Navigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../context/UserContext.jsx";
import ConfirmPasswordModal from "../components/ConfirmPasswordModal.jsx";

export const UserView = () => {
  const {token} = useAuthContext()
  const {getUser,formValues,onChange,user} = useContext(UserContext)
  const [confirmPasswordModalOpen,setConfirmPasswordModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  let {id} = useParams()
  const handleClick = () => {
    setIsDisabled(!isDisabled)
  };
  useEffect(() => {
    getUser(id)
  },[])
  if (!token) {
    return <Navigate to="/"/>
  }
  return (
    <>
      <div className="flex items-center justify-center h-1/2 flex-col">
        <img className="w-[150px] mb-5" src="/assets/images/pngegg.png"/>
        <h1 className="mb-[25px] font-semibold text-2xl">{user.firstName} {user.lastName}</h1>
        <div className="flex flex-col items-center justify-center">
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
        </div>
        <div>
          <Link to={`/maker-io/user/${id}/change-password`}>Change Password</Link>
          {
            isDisabled ?
              <button
                className="ml-[400px] font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl"
                type="button"
                onClick={handleClick}
              >
                Edit
              </button>
              :
              <div className="ml-[260px] flex gap-4">
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

                <button onClick={(e) => { e.stopPropagation(); setConfirmPasswordModalOpen(true); }}
                        className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                  Update
                </button>
                <ConfirmPasswordModal id="confirm-password-modal" modalOpen={confirmPasswordModalOpen} setModalOpen={setConfirmPasswordModalOpen}/>
              </div>

          }
        </div>
      </div>
    </>
  )
}
