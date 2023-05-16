import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";
import axiosClient from "../axios-client.js";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "flowbite-react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {token, setUser, user} = useAuthContext()
  const {isLoading} = useQuery(["user"], () => {
    return axiosClient.get('/user').then((res) => {
      setUser(res.data)
      return res.data
    })
  })
  if (token) {
    if (isLoading) {
      return (
        <>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
              <Spinner
                className="absolute top-1/2 left-1/2"
                size="xl"
                color="purple"
                aria-label="Purple spinner example"
              />
            </div>
          </div>
        </>
      )
    } else {
      if (user['acc_type'] === 0) {
        return (
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
              <Outlet/>
            </div>
          </div>
        )
      } else {
        return (
          <div className="bg-gradient-to-r from-red-800 to-blue-800">
            <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div className="border-t border-gray-200 text-center pt-8">
                  <h1 className="text-8xl font-bold text-red-800">Not Authorized</h1>
                  <h1 className="text-5xl font-medium py-8">OOPS! You are not Authorized</h1>
                  <p className="text-m pb-8 px-12 font-medium">You are not authorized to access this page, Please click
                    button below to go back. Sorry for inconvenience.</p>
                  <NavLink to="/">
                    <button
                      className="bg-gradient-to-r from-red-800 to-blue-800 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                      HOME
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  } else {
    return <Navigate to="/"/>
  }

}
