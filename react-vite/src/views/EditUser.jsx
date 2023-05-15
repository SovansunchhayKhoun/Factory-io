// eslint-disable-next-line no-unused-vars
import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid/index.js";
import UserContext from "../context/UserContext.jsx";
import ConfirmPasswordModal from "../components/ConfirmPasswordModal.jsx";
export const EditUser = () => {
  const navigate = useNavigate()

  const {getUser,errors,formValues,onChange} = useContext(UserContext)

  let {id} = useParams()

  useEffect(() => {
    getUser(id)
  },[])

  const [confirmPasswordModalOpen,setConfirmPasswordModalOpen] = useState(false);

  return(
    <>
      <button className="m-4" onClick={() => {
        navigate(-1)
      }}>
        <ArrowLeftIcon className="h-6 mr-5"/>
      </button>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[400px]] max-w-9xl mx-auto">
        <div className="space-y-6 p-12">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               First Name</label>
            {errors.firstName && <span className="text-sm text-red-400">{errors.firstName[0]}</span>}
            <input type="firstName" name="firstName" id="firstName"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   value={formValues['firstName']}
                   onChange={onChange}
                   required/>
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name</label>
            {errors.lastName && <span className="text-sm text-red-400">{errors.lastName[0]}</span>}
            <input type="lastName" name="lastName" id="lastName"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   value={formValues['lastName']}
                   onChange={onChange}
                   required/>
          </div>
          <div className="flex gap-8">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone Number</label>
            <input type="phoneNumber" name="phoneNumber" id="phoneNumber"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   value={formValues['phoneNumber']}
                   onChange={onChange}
                   required/>
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender</label>
            <input type="gender" name="gender" id="gender"
                   value={formValues['gender']}
                   onChange={onChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email</label>
            <input name="email" id="email"
                   value={formValues['email']}
                   onChange={onChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username</label>
            <input name="username" id="username"
                   value={formValues['username']}
                   onChange={onChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setConfirmPasswordModalOpen(true); }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update
          </button>
          <ConfirmPasswordModal id="confirm-password-modal" modalOpen={confirmPasswordModalOpen} setModalOpen={setConfirmPasswordModalOpen}/>
        </div>
      </div>
    </>

  )
}
