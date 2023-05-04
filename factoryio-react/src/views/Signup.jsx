import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import makerio from "../assets/images/makerio.png"
import {useState} from "react";
import axios from "../api/axios"
import {useNavigate} from "react-router-dom";

export default function Signup(){
    return (
        <>
            <div className="flex absolute top-[20px] left-[30px]">
                <div>
                    <Link to="/">
                        <ArrowLeftIcon className="h-6 mr-5"/>
                    </Link>
                </div>
                <div>
                    <img src={makerio} className='object-contain' style={{width: 167 + 'px'}}/>
                </div>
            </div>
            <form>
                <div className="flex items-center justify-center h-screen flex-col">
                    <h1 className="mb-[50px] text-tealHover font-bold text-5xl">Create a new account</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex mb-6 w-[500px] gap-5">
                            <div className="w-1/2">
                                <input type="name" id="firstName"
                                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                       placeholder="First name"
                                       required/>
                            </div>
                            <div className="w-1/2">
                                <input type="name" id="lastName"
                                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                       placeholder="Last name"
                                       required/>
                            </div>
                        </div>
                        <div className="mb-6 w-[500px]">
                            <input type="name" id="phoneNumber"
                                   className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Phone Number"
                                   required/>
                        </div>
                        <div className="mb-6 w-[500px]">
                            <input type="email" id="email"
                                   className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Email"
                                   required/>
                        </div>
                        <div className="mb-6 w-[500px]">
                            <input type="password" id="password"
                                   className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Password"
                                   required/>
                        </div>
                        <div className="mb-6 w-[500px]">
                            <input type="password" id="confpassword"
                                   className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Confirm Password"
                                   required/>
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
}