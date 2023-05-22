import  { useContext} from 'react';
import InvoiceContext from "../context/InvoiceContext.jsx";

import React, {useState} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard} from "react-icons/md";
import {AiOutlineUser} from "react-icons/ai";
import {FiMessageSquare, FiFolder} from "react-icons/fi";
import {Link, NavLink} from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard},
    {name: "Users", link: "/admin/users", icon: AiOutlineUser},
    {name: "Inventory", link: "/admin/inventory", icon: FiFolder},
    {name: "Customer Service", link: "/admin/customer-service", icon: FiMessageSquare},
  ];
  const [open, setOpen] = useState(true);
  const {invoices, setInvStatus, invStatus} = useContext(InvoiceContext);
  const notificationCounter = status => {
    const invoiceType = invoices?.filter((inv) => inv.status === status);
    if (invoiceType?.length > 0) {
      return invoiceType?.length;
    } else if (invoiceType?.length > 10) {
      return "10+";
    } else {
      return false;
    }
  }
  return (
    <section className="flex gap-6">
      <div
        className={`bg-whiteFactory min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between">
          <NavLink to={'/'}><img
            className={`${
              !open && "hidden"
            }`}
            width="150" src="/assets/images/makerio.png" alt=""/></NavLink>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-teal-500"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md`}
            >
              <div className="text-teal-500">{React.createElement(menu?.icon, {size: "20"})}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-teal-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
            <NavLink
              onClick={() => {
                setInvStatus(-1)
              }}
              end
              to="/admin/orders"
              className={'block transition duration-150 truncate ' + (invStatus === -1 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
            >
                                       <span
                                         className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                         Pending
                                         <div
                                           className={`${notificationCounter(-1) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>
                                           {notificationCounter(-1)}
                                         </div>
                                       </span>
            </NavLink>
            <NavLink
              end
              onClick={() => {
                setInvStatus(1)
              }}
              to="/admin/orders"
              className={'block transition duration-150 truncate ' + (invStatus === 1 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
            >
                                       <span
                                         className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                         Accepted
                                         <div
                                           className={`${notificationCounter(1) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(1)}</div>
                                       </span>
            </NavLink>
            <NavLink
              onClick={() => {
                setInvStatus(2)
              }}
              end
              to="/admin/orders"
              className={'block transition duration-150 truncate ' + (invStatus === 2 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
            >
                                       <span
                                         className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                         Delivering
                                         <div
                                           className={`${notificationCounter(2) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(2)}</div>
                                       </span>
            </NavLink>
            <NavLink
              onClick={() => {
                setInvStatus(3)
              }}
              end
              to="/admin/orders"
              className={'block transition duration-150 truncate ' + (invStatus === 3 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
            >
                                       <span
                                         className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                         Arrived
                                       <div
                                         className={`${notificationCounter(3) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(3)}</div>
                                       </span>
            </NavLink>
            <NavLink
              onClick={() => {
                setInvStatus(-2)
              }}
              end
              to="/admin/orders"
              className={'block transition duration-150 truncate ' + (invStatus === -2 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
            >
                                       <span
                                         className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                         No Stock
                                         <div
                                           className={`${notificationCounter(-2) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(-2)}</div>
                                       </span>
            </NavLink>
        </div>

      </div>
    </section>
  );
};

export default Sidebar;

