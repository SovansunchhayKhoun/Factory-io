import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link, Navigate, useNavigate} from "react-router-dom";
// import makerio from "../assets/makerio.png"
import {useContext, useEffect, useRef, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axiosClient from "../axios-client.js";
import UserContext from "../context/UserContext.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken, token} = useAuthContext()
  const navigate = useNavigate()
  const {getAdmin, admin} = useContext(UserContext)
  useEffect(() => {
    getAdmin()
  }, [])

  const onSubmit = (ev) => {
    ev.preventDefault()
    const formValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    if (admin['email'] === emailRef.current.value) {
      axiosClient.post('/loginAsAdmin', formValues)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
          navigate("/admin/dashboard")
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors)
            } else {
              setErrors({
                email: [response.data.message]
              })
            }
          }
        })
    } else {
      axiosClient.post('/login', formValues)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
          history.back()
        })
        .catch(err => {

          const response = err.response
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors)
            } else {
              setErrors({
                email: [response.data.message]
              })
            }
          }
        })
    }

  }
  if (!token) {
    return (
      <>
        <div className="flex absolute top-[20px] left-[30px]">
          <div>
            <Link to="/">
              <ArrowLeftIcon className="h-6 mr-5"/>
            </Link>
          </div>
          <div>
            <img src="/assets/images/makerio.png" className='object-contain' style={{width: 167 + 'px'}}/>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-center h-screen flex-col">
            <h1 className="mb-[50px] text-tealHover font-bold text-5xl">Sign In</h1>
            {
              errors && <div className="text-white text-semibold mb-5 p-5 bg-red-500 rounded-[4px]">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
            <div className="flex flex-col w-[450px] gap-6 justify-center">
              <input type="email" id="email"
                     name="email"
                     ref={emailRef}
                     className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Email"
              />
              <input type="password" id="password"
                     name="password"
                     ref={passwordRef}
                     className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Password"
              />
              <div className="flex justify-between items-center">
                <button
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                  Sign In
                </button>
                <div className="flex gap-x-1">
                  <p>Don't have an account?</p>
                  <Link to="/signup"
                        className="text-tealHover font-bold"
                  >Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>

      </>
    )
  } else {
    return <Navigate to="/user"/>
  }

}
