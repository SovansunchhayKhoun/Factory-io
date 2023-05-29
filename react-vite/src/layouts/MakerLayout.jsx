import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useContext, useEffect} from "react";
import InvoiceContext from "../context/InvoiceContext.jsx";
import axiosClient from "../axios-client.js";
import ChatContext from "../context/ChatContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import UserContext from "../context/UserContext.jsx";

export const MakerLayout = () => {
  const {usersQuery} = useContext(UserContext);
  const {setUser, token} = useAuthContext()
  const {initChat} = useContext(ChatContext);
  useEffect(() => {
    usersQuery?.forEach((users) => {
      initChat(users.username, 'admin');
    })
    if (token) {
      axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }
  }, [usersQuery]);

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-auto">
        <NavBar/>
        <main className="xl:px-12 xl:py-24 lg:px-14 lg:py-20 md:px-12 md:py-20 px-6 py-14">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  );
};
