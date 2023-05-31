import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";
import axiosClient from "../axios-client.js";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "flowbite-react";
import {UnauthorizedView} from "../views/UnauthorizedView.jsx";

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
            <Sidebar/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>*/}
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
            <Sidebar/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
              <Outlet/>
            </div>
          </div>
        )
      } else {
        return (
          <UnauthorizedView/>
        )
      }
    }
  } else {
    return <Navigate to="/"/>
  }

}
