import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Footer} from "../components/Footer.jsx";
import {LandingNavBar} from "../components/LandingNavBar.jsx";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axiosClient from "../axios-client.js";
import {useQuery} from "@tanstack/react-query";

export const LandingLayout = () => {
  const {user,onLogout, setUser, token, setIsLoading, setToken} = useAuthContext()
  const navigate = useNavigate();

  // redirect to home when logout
  useEffect(() => {
    navigate('/');
  }, [onLogout]);

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
          setIsLoading(false)
        }).catch((e) => {
        if (e.response.status === 401) {
          setIsLoading(false);
          setUser({})
          setToken(null);
        }
      })
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-auto">
        <LandingNavBar/>
        <main className="
          min-[1920px]:px-36
          xl:pb-8
          lg:px-16
          md:px-6 md:pt-24 md:pb-2
          pb-6 px-6 pt-16">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  );


};
