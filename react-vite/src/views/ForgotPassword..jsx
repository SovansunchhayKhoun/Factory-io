import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useAuthContext} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

export const ForgotPassword = () => {
  const {token} = useAuthContext()
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axiosClient.post('submitForgotPasswordForm',({
      email
    })).then(({data}) => {
      setMessage(data)
    }).catch((e) => {
      if(e.response.status === 422){
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
          <div className="flex justify-center">
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
