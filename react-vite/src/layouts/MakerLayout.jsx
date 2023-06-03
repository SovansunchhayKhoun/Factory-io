import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {lazy, Suspense, useContext, useEffect} from "react";
import axiosClient from "../axios-client.js";
import ChatContext from "../context/ChatContext.jsx";
import UserContext from "../context/UserContext.jsx";
import {Spinner} from "flowbite-react";
import {useJsApiLoader} from "@react-google-maps/api";

export const MakerLayout = () => {
  const {usersQuery} = useContext(UserContext);
  const {setUser, token, setIsLoading} = useAuthContext()
  const {initChat} = useContext(ChatContext);
  useEffect(() => {
    if (token) {
      // usersQuery?.forEach( (users) => {
      //   initChat(users.username, 'admin');
      // })
      setIsLoading(true)
      try {
        axiosClient.get('/user')
          .then(({data}) => {
            setUser(data)
            setIsLoading(false)
          })
      } catch (e) {
        setIsLoading(false)
        console.log(e)
      }
    }
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-auto">
        <NavBar/>
        <main className="xl:px-12 xl:pt-24 xl:pb-8 lg:px-16 md:px-12 md:pt-16 md:pb-2 pb-6 px-6 pt-14">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  );
};
