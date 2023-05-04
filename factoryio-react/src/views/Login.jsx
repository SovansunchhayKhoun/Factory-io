import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link,useNavigate} from "react-router-dom";
import makerio from "../assets/images/makerio.png"
export default function Login(){
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
            <form >
                <div className="flex items-center justify-center h-screen flex-col">
                    <h1 className="mb-[50px] text-tealHover font-bold text-5xl">Sign In</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-6 w-[400px]">
                            <input type="email" id="email"
                                   className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Email"
                                   required/>
                        </div>
                        <div className="mb-6 w-[400px]">
                            <input type="password" id="password"
                                   className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                                   placeholder="Password"
                                   required/>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-[50px]">
                        <div>
                            <button
                                className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl">
                                Sign In
                            </button>
                        </div>
                        <div className="flex gap-x-1">
                            <p>Don't have an account?</p>
                            <Link to="/signup"
                                  className="text-tealHover font-bold"
                            >Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}