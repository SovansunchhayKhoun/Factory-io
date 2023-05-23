import {useContext} from 'react';
import InvoiceContext from "../context/InvoiceContext.jsx";

import React, {useState} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard, MdOutlinePending} from "react-icons/md";
import {AiOutlineUser, AiOutlineCheckCircle} from "react-icons/ai";
import {FiMessageSquare, FiFolder} from "react-icons/fi";
import {TbRoad, TbHomeCheck, TbPackageOff} from "react-icons/tb"
import {Link, NavLink} from "react-router-dom";
import ChatContext from "../context/ChatContext.jsx";

const Sidebar = () => {
  const {invoices, setInvStatus, invStatus} = useContext(InvoiceContext);
  const {message, messageReFetch} = useContext(ChatContext)
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
  const menus = [
    {name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard},
    {name: "Users", link: "/admin/users", icon: AiOutlineUser},
    {name: "Inventory", link: "/admin/inventory", icon: FiFolder},
    {name: "Customer Service", link: "/admin/customer-service", icon: FiMessageSquare, notification: message?.filter((msg) => msg.is_read === 0 && msg.sender_id !== 'admin').length},
    {name: "Pending", link: "/admin/orders", icon: MdOutlinePending, handleClick: -1, notification: notificationCounter(-1)},
    {name: "Accepted", link: "/admin/orders", icon: AiOutlineCheckCircle, handleClick: 1, notification: notificationCounter(1)},
    {name: "Delivering", link: "/admin/orders", icon: TbRoad, handleClick: 2, notification: notificationCounter(2)},
    {name: "Arrived", link: "/admin/orders", icon: TbHomeCheck, handleClick: 3, notification: notificationCounter(3)},
    {name: "No stock", link: "/admin/orders", icon: TbPackageOff, handleClick: -2, notification: notificationCounter(-2)},
  ];
  const [open, setOpen] = useState(true);
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
            <NavLink
              onClick={() => {
                setInvStatus(menu?.handleClick)
              }}
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
                className={`whitespace-pre duration-500 text-teal-500 flex items-center gap-x-2 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
                <div className={`${menu?.notification || 'hidden' } flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-teal-500 text-whiteFactory`}>
                  {menu?.notification}
                </div>
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } flex items-center gap-x-2 absolute z-10 left-48 bg-whiteFactory font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
                <div className={`${menu?.notification || 'hidden' } flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-teal-500 text-whiteFactory`}>
                  {menu?.notification}
                </div>
              </h2>
            </NavLink>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sidebar;

