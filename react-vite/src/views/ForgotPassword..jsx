import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useAuthContext} from "../context/AuthContext.jsx";
import {Link, Navigate} from "react-router-dom";
import {Spinner} from "flowbite-react";

export const ForgotPassword = () => {
  const {token} = useAuthContext()
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    setIsLoading(true)
    setMessage('')
    e.preventDefault()
    axiosClient.post('submitForgotPasswordForm',({
      email
    })).then(({data}) => {
      setIsLoading(false)
      setMessage(data)
      setEmail('')
    }).catch((e) => {
      if(e.response.status === 422){
        setIsLoading(false)
        setMessage(e.response.data)
      }
    })
  }
  useEffect(() => {
    setMessage('')
  },[])
  if(!token){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg px-8 py-8 max-w-[500px] min-w-[300px] flex flex-col gap-6 shadow-2xl">
          <Link to="/" className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </Link>
          <div className="flex justify-center ">
            <img className="max-w-[250px] " src="/assets/images/makerio.png"/>
          </div>
          <p className="text-gray-700">Enter the email address associated with your account and we'll send you a link to reset your password</p>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Email:</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-tealActive px-4 py-2 rounded-md" />
          </div>
            {isLoading && <div className="flex justify-center align-middle"><Spinner
              size="xl"
              color="purple"
              aria-label="Purple spinner example"
            /></div> }


          {message?.message && <span className="text-red-500 text-sm text-center">{message.message}</span>}
          <div className="flex flex-col gap-2">
            <button onClick={e => handleSubmit(e)} className="px-4 py-2 font-semibold bg-tealActive border-tealActive border transition duration-300 hover:bg-tealBase rounded-md">Continue</button>
          </div>
        </div>
      </div>
    )
  }else {
    return <Navigate to="/"/>
  }

}
