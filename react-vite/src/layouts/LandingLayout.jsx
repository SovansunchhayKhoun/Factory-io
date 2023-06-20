import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import {Footer} from "../components/Footer.jsx";
import {LandingNavBar} from "../components/LandingNavBar.jsx";
import React, {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axiosClient from "../axios-client.js";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "flowbite-react";

export const LandingLayout = () => {
  const {setUser, token, setToken} = useAuthContext()

  if (token) {
    const {isLoading} = useQuery(["user"], () => {
      return axiosClient.get('/user').then((res) => {
        setUser(res.data)
        return res.data
      }).catch((e) => {
        if (e.response.status === 401) {
          setUser({})
          setToken(null);
        }
      })
    })
    if (!isLoading) {
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
    } else {
      return (
        <div className="h-screen flex justify-center items-center flex-col gap-8">
          <img className={"lg:w-[300px] md:w-[200px] w-[100px]"} src="/assets/images/makerio.png" alt=""/>
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />
        </div>
      )
    }
  } else {
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
  }
}
