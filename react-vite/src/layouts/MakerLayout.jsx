import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {lazy, Suspense, useContext, useEffect} from "react";
import axiosClient from "../axios-client.js";
import ChatContext from "../context/ChatContext.jsx";
import UserContext from "../context/UserContext.jsx";
import {Spinner} from "flowbite-react";

export const MakerLayout = () => {
  const {usersQuery} = useContext(UserContext);
  const {setUser, token, isLoading, setIsLoading} = useAuthContext()
  const {initChat} = useContext(ChatContext);
  useEffect(() => {
    usersQuery?.forEach((users) => {
      initChat(users.username, 'admin');
    })
    if (token) {
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
  }, [usersQuery]);

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
