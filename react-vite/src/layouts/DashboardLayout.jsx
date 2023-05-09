import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {setUser, token,user} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  }, []);
  if (token) {
    if(user['acc_type'] === 0) {
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
    }else{
      return (
        <div>
          You are not authorize
          <NavLink to="/">GO back</NavLink>
        </div>
      )
    }

  } else {
    return <Navigate to="/"/>
  }

}
