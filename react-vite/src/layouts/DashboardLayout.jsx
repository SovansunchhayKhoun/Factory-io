import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import Sidebar from "../partials/Sidebar.jsx";
import Header from "../partials/Header.jsx";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {setUser, token} = useAuthContext()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('USER_CREDENTIALS')))
  }, []);
  if (!token) {
    return <Navigate to="/"/>
  } else {
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
  }

}
