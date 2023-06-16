import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useAuthContext} from "../context/AuthContext.jsx";

export const ResetPassword = () => {
  const [errors,setErrors] = useState('')
  const {token} = useAuthContext();
  const [goBackBtn, setGoBackBtn] = useState(false)
  const [password,setPassword] = useState('')
  const [confirm_password,setConfirmPassword] = useState('')
  const navigate = useNavigate()
  let {tokens} =useParams()
  const handleSubmit = (e) => {
    e.preventDefault()
    axiosClient.post('resetPassword',({
      password,
      confirm_password,
      token:tokens
    })).then(() => {
      navigate('/login')
    }).catch((e) => {
      if(e.response.status === 422){
        setErrors(e.response.data)
      }else if(e.response.status === 401){
        setErrors(e.response.data)
        setGoBackBtn(true)
      }
    })
  }
  useEffect(() => {
    setErrors('')
  },[])
  if(!token){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg px-8 py-8 max-w-[500px] min-w-[300px] flex flex-col gap-6 shadow-2xl">
          <div className="flex justify-center">
            <img className="max-w-[250px] " src="/assets/images/makerio.png"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-tealActive px-4 py-2 rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirm_password}
              onChange={e => setConfirmPassword(e.target.value)}
              className="border border-tealActive px-4 py-2 rounded-md" />
          </div>
          {errors?.message && <span className="text-red-500 text-sm text-center">{errors.message}</span>}
          <button onClick={e => navigate('/forgot-password')} className={`px-4 py-2 font-semibold bg-tealActive border-tealActive border transition duration-300 hover:bg-tealBase rounded-md ${!goBackBtn && 'hidden'}`}>Go back to forgot password page</button>
          <div className={` ${goBackBtn && 'hidden'} flex flex-col gap-2`}>
            <button onClick={e => handleSubmit(e)} className="px-4 py-2 font-semibold bg-tealActive border-tealActive border transition duration-300 hover:bg-tealBase rounded-md">Continue</button>
          </div>
        </div>
      </div>
    )
  }else {
    return <Navigate to="/"/>
  }

}
