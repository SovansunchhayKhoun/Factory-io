import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";


export default function Home(){
    const {setUser,setToken,user} = useStateContext()
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
    },[])
    return (
        <>
            <h1>
                hello
                {user?.firstName}
            </h1>
        </>
    )
}
