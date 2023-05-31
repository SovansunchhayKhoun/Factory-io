import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link, Navigate} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";

export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const phoneNumberRef = useRef();
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)
    const {setUser, setToken,token} = useAuthContext()
    const onSubmit = (event) => {
        event.preventDefault()
        const formValues = {
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            username: firstNameRef.current.value + lastNameRef.current.value
        }
        console.log(formValues)
        axiosClient.post('/signup', formValues)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
                history.back()
            })
            .catch(err => {
                const response = err.response
                    console.log(response.data)
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }
    if(!token){
      return (
        <>
          <div className="flex absolute top-[20px] left-[30px]">
            <div>
              <Link to="/">
                <ArrowLeftIcon className="h-6 mr-5"/>
              </Link>
            </div>
            <img src="/assets/images/makerio.png" className='object-contain' style={{width: 167 + 'px'}}/>
          </div>
          <form onSubmit={onSubmit}>
            <div className="flex items-center justify-center h-screen flex-col">
              <h1 className="mb-[50px] text-tealHover font-bold text-5xl">Create a new account</h1>
              {
                errors && <div className="text-white text-semibold mb-5 p-5 bg-red-500 rounded-[4px]">
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }
              <div className="flex flex-col items-center justify-center">
                <div className="flex mb-6 w-[500px] gap-5">
                  <div className="w-1/2">
                    <input type="name" id="firstName"
                           ref={firstNameRef}
                           className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                           placeholder="First name"
                    />
                  </div>
                  <div className="w-1/2">
                    <input type="name" id="lastName"
                           ref={lastNameRef}
                           className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                           placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="mb-6 w-[500px]">
                  <input type="name" id="phoneNumber"
                         ref={phoneNumberRef}
                         className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                         placeholder="Phone Number"
                  />
                </div>
                <div className="mb-6 w-[500px]">
                  <input type="email" id="email"
                         ref={emailRef}
                         className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                         placeholder="Email"
                  />
                </div>
                <div className="mb-6 w-[500px]">
                  <input type="password" id="password"
                         ref={passwordRef}
                         className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                         placeholder="Password"
                  />
                </div>
                <div className="mb-6 w-[500px]">
                  <input type="password" id="confpassword"
                         ref={passwordConfirmationRef}
                         className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                         placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-[125px]">
                <div>
                  <button
                    className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                    Create account
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
    }else {
      return <Navigate to="/"/>
    }

}
