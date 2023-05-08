import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect} from "react";



export default function Home(){
    const {setUser,setToken,user} = useAuthContext()
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
