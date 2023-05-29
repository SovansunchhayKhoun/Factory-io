import {Link, useLocation} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import CartContext from "../context/CartContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";
import ProductContext from "../context/ProductContext.jsx";
import {Avatar, Dropdown} from "flowbite-react";
import {Fragment} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


export const NavBar = (props) => {
  const {items, searchInput, itemsQueryReFetch, setSearchInput} = useContext(ProductContext);
  const {cartItem, getCartItem} = useContext(CartContext);
  useEffect(() => {
    itemsQueryReFetch();
    getCartItem();
  }, []);

  const location = useLocation();
  const {onLogout, token, user} = useAuthContext()
  const {invoices} = useContext(InvoiceContext)
  const {message, findChat} = useContext(ChatContext);

  const readMessage = message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id && msg.is_read === 0 && msg.sender_id !== user.username);
  const orders = invoices?.filter((inv) => inv.user_id === user.id && inv.status !== 3);

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <nav className=" z-50 fixed top-0 flex flex-col w-full bg-whiteFactory
    xl:px-36 xl:py-4
    lg:px-12 lg:py-3
    md:px-6 md:py-2
    px-8 py-2">
      <section className="flex justify-between items-center w-full">
        {/*left section*/}
        <div className="flex flex-row items-center gap-x-2">
          <Link to="/">
            <img className={"lg:w-[100px] md:w-[120px] w-[100px]"} src="/assets/images/makerio.png" alt=""/>
          </Link>
          <Link
            // onClick={() => {initChat(user.username, 'admin')}}
            className={"flex relative"} to="/customer-service">
            <img className="lg:w-[20px] lg:h-[20px] md:w-[20px] md:h-[20px] w-[15px] h-[15px]"
                 src="/assets/images/customer-service.png" alt=""/>
            <span
              className={`${readMessage?.length === 0 && 'hidden'} absolute top-[-10px] right-[-10px] bg-tealActive w-[18px] h-[18px] rounded-[50%] flex items-center justify-center text-whiteFactory text-[12px]`}>
            {readMessage?.length}
          </span>
          </Link>
        </div>

        {/*search bar*/}
        <div className="md:flex md:items-center md:gap-x-12 lg:w-[384px] hidden">
          <input type="text"
                 className="w-[100%] px-12 search-bar py-1 border-none"
                 onChange={event => {
                   setSearchInput(event.target.value)
                 }}/>
          {/*<div className="">*/}
          {/*</div>*/}
        </div>
        {/*right section*/}
        <div className="md:flex md:items-center md:gap-x-6 hidden">
          {/*home icon*/}
          <div className="highlight-hover text-[#8A0000]">
            <Link to="/maker-io">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path
                  d="M29.1667 27.7087V15.3128C29.1667 15.0864 29.114 14.8631 29.0127 14.6606C28.9115 14.4581 28.7645 14.282 28.5833 14.1462L18.375 6.48991C18.1226 6.30058 17.8156 6.19824 17.5 6.19824C17.1845 6.19824 16.8774 6.30058 16.625 6.48991L6.41668 14.1462C6.23556 14.282 6.08855 14.4581 5.9873 14.6606C5.88605 14.8631 5.83334 15.0864 5.83334 15.3128V27.7087C5.83334 28.0954 5.98699 28.4664 6.26048 28.7399C6.53397 29.0133 6.9049 29.167 7.29168 29.167H13.125C13.5118 29.167 13.8827 29.0133 14.1562 28.7399C14.4297 28.4664 14.5833 28.0954 14.5833 27.7087V23.3337C14.5833 22.9469 14.737 22.576 15.0105 22.3025C15.284 22.029 15.6549 21.8753 16.0417 21.8753H18.9583C19.3451 21.8753 19.7161 22.029 19.9895 22.3025C20.263 22.576 20.4167 22.9469 20.4167 23.3337V27.7087C20.4167 28.0954 20.5703 28.4664 20.8438 28.7399C21.1173 29.0133 21.4882 29.167 21.875 29.167H27.7083C28.0951 29.167 28.4661 29.0133 28.7395 28.7399C29.013 28.4664 29.1667 28.0954 29.1667 27.7087Z"
                  stroke={`${location.pathname === '/maker-io' ? '#8A0000' : '#00727A'}`} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/*cart icon*/}
          <div className="highlight-hover relative">
            {
              user['acc_type'] === 0 ?
                <Link to="/admin/dashboard">
                  Dashboard
                </Link>
                :
                <>
                  <Link to={
                    token ? "/cart" : "/login"
                  }>
                    {/*<img src="/assets/images/carticon.png" alt=""/>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path
                        d="M0 2.8125C0 2.56386 0.0987721 2.3254 0.274587 2.14959C0.450403 1.97377 0.68886 1.875 0.9375 1.875H3.75C3.95912 1.87506 4.16222 1.94503 4.327 2.0738C4.49177 2.20256 4.60877 2.38272 4.65937 2.58562L5.41875 5.625H27.1875C27.3252 5.62513 27.4611 5.65557 27.5857 5.71416C27.7102 5.77275 27.8204 5.85805 27.9082 5.96401C27.9961 6.06996 28.0596 6.19397 28.0941 6.32722C28.1287 6.46047 28.1335 6.59969 28.1081 6.735L25.2956 21.735C25.2554 21.9498 25.1414 22.1439 24.9733 22.2836C24.8052 22.4232 24.5936 22.4998 24.375 22.5H7.5C7.28144 22.4998 7.06981 22.4232 6.90171 22.2836C6.7336 22.1439 6.61959 21.9498 6.57938 21.735L3.76875 6.76313L3.01875 3.75H0.9375C0.68886 3.75 0.450403 3.65123 0.274587 3.47541C0.0987721 3.2996 0 3.06114 0 2.8125ZM5.81625 7.5L8.27812 20.625H23.5969L26.0588 7.5H5.81625ZM9.375 22.5C8.38044 22.5 7.42661 22.8951 6.72335 23.5984C6.02009 24.3016 5.625 25.2554 5.625 26.25C5.625 27.2446 6.02009 28.1984 6.72335 28.9016C7.42661 29.6049 8.38044 30 9.375 30C10.3696 30 11.3234 29.6049 12.0267 28.9016C12.7299 28.1984 13.125 27.2446 13.125 26.25C13.125 25.2554 12.7299 24.3016 12.0267 23.5984C11.3234 22.8951 10.3696 22.5 9.375 22.5ZM22.5 22.5C21.5054 22.5 20.5516 22.8951 19.8484 23.5984C19.1451 24.3016 18.75 25.2554 18.75 26.25C18.75 27.2446 19.1451 28.1984 19.8484 28.9016C20.5516 29.6049 21.5054 30 22.5 30C23.4946 30 24.4484 29.6049 25.1516 28.9016C25.8549 28.1984 26.25 27.2446 26.25 26.25C26.25 25.2554 25.8549 24.3016 25.1516 23.5984C24.4484 22.8951 23.4946 22.5 22.5 22.5ZM9.375 24.375C9.87228 24.375 10.3492 24.5725 10.7008 24.9242C11.0525 25.2758 11.25 25.7527 11.25 26.25C11.25 26.7473 11.0525 27.2242 10.7008 27.5758C10.3492 27.9275 9.87228 28.125 9.375 28.125C8.87772 28.125 8.40081 27.9275 8.04918 27.5758C7.69754 27.2242 7.5 26.7473 7.5 26.25C7.5 25.7527 7.69754 25.2758 8.04918 24.9242C8.40081 24.5725 8.87772 24.375 9.375 24.375ZM22.5 24.375C22.9973 24.375 23.4742 24.5725 23.8258 24.9242C24.1775 25.2758 24.375 25.7527 24.375 26.25C24.375 26.7473 24.1775 27.2242 23.8258 27.5758C23.4742 27.9275 22.9973 28.125 22.5 28.125C22.0027 28.125 21.5258 27.9275 21.1742 27.5758C20.8225 27.2242 20.625 26.7473 20.625 26.25C20.625 25.7527 20.8225 25.2758 21.1742 24.9242C21.5258 24.5725 22.0027 24.375 22.5 24.375Z"
                        fill={`${location.pathname === '/cart' ? '#8A0000' : '#00727A'}`}/>
                    </svg>
                  </Link>
                  <span
                    className={cartItem.length === 0 ? 'hidden' : " flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-redBase text-whiteFactory rounded-[50%] text-[12px]"}>
            {cartItem.reduce((total, i) => total += i.qty, 0)}
                </span>
                </>
            }
          </div>

          {/*order icon*/}
          <div className="highlight-hover">
            {
              user['acc_type'] === 0 ? null :
                <><Link className="relative" to={
                  token ? "/order" : "/login"
                }>
                  {/*<img src="/assets/images/ordericon.png" alt=""/>*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                      d="M5 23.75V10H25V14.1125C25.9 14.3875 26.75 14.7875 27.5 15.325V10C27.5 8.6125 26.3875 7.5 25 7.5H20V5C20 3.6125 18.8875 2.5 17.5 2.5H12.5C11.1125 2.5 10 3.6125 10 5V7.5H5C3.6125 7.5 2.5125 8.6125 2.5125 10L2.5 23.75C2.5 25.1375 3.6125 26.25 5 26.25H14.6C14.225 25.475 13.975 24.6375 13.85 23.75H5ZM12.5 5H17.5V7.5H12.5V5Z"
                      fill={`${location.pathname === '/order' ? '#8A0000' : '#00727A'}`}/>
                    <path
                      d="M22.5 16.25C19.05 16.25 16.25 19.05 16.25 22.5C16.25 25.95 19.05 28.75 22.5 28.75C25.95 28.75 28.75 25.95 28.75 22.5C28.75 19.05 25.95 16.25 22.5 16.25ZM24.5625 25.4375L21.875 22.75V18.75H23.125V22.2375L25.4375 24.55L24.5625 25.4375Z"
                      fill={`${location.pathname === '/order' ? '#8A0000' : '#00727A'}`}/>
                  </svg>
                  <span
                    className={`${orders?.length === 0 && 'hidden'} flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-tealActive text-whiteFactory rounded-[50%] text-[12px]`}>
              {orders?.length}
            </span>
                </Link></>
            }
          </div>

          {/*profile icon*/}
          {token ?
            <Dropdown inline label={<img src="/assets/images/pficon.png" alt=""/>} style={{background: "none"}}>
              <Dropdown.Header>
                {user.username}
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={`/user/${user.id}`}>
                  Account
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={onLogout}>
                  Sign out
                </button>
              </Dropdown.Item>
            </Dropdown>
            :
            <div className="">
              <div
                className="flex justify-center items-center gap-x-2 transition duration-500 cursor-pointer text-tealHover hover:text-whiteFactory hover:bg-tealBase px-2 py-1 rounded-md font-semibold">
                <Link to="/login" className="">
                  Sign in
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8">
                  <path className="" strokeLinecap="round" strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              {/*<div*/}
              {/*  className="highlight-hover text-[#3C3C3C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">*/}
              {/*  <Link to="/signup">*/}
              {/*    <button className="px-4 py-[2px] text-black bg-redBase rounded-[20px] ">Sign up</button>*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>
          }
        </div>

        <div className="md:hidden flex items-center gap-x-2">
          <Dropdown
            placement="bottom-end"
            inline style={{background: "none"}} arrowIcon={false}
            label={
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      color="#048D95"/>
              </svg>}>
            <Dropdown.Item>
              <div className="flex items-center gap-x-2">
                <Link to="/maker-io">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 35 35" fill="none">
                    <path
                      d="M29.1667 27.7087V15.3128C29.1667 15.0864 29.114 14.8631 29.0127 14.6606C28.9115 14.4581 28.7645 14.282 28.5833 14.1462L18.375 6.48991C18.1226 6.30058 17.8156 6.19824 17.5 6.19824C17.1845 6.19824 16.8774 6.30058 16.625 6.48991L6.41668 14.1462C6.23556 14.282 6.08855 14.4581 5.9873 14.6606C5.88605 14.8631 5.83334 15.0864 5.83334 15.3128V27.7087C5.83334 28.0954 5.98699 28.4664 6.26048 28.7399C6.53397 29.0133 6.9049 29.167 7.29168 29.167H13.125C13.5118 29.167 13.8827 29.0133 14.1562 28.7399C14.4297 28.4664 14.5833 28.0954 14.5833 27.7087V23.3337C14.5833 22.9469 14.737 22.576 15.0105 22.3025C15.284 22.029 15.6549 21.8753 16.0417 21.8753H18.9583C19.3451 21.8753 19.7161 22.029 19.9895 22.3025C20.263 22.576 20.4167 22.9469 20.4167 23.3337V27.7087C20.4167 28.0954 20.5703 28.4664 20.8438 28.7399C21.1173 29.0133 21.4882 29.167 21.875 29.167H27.7083C28.0951 29.167 28.4661 29.0133 28.7395 28.7399C29.013 28.4664 29.1667 28.0954 29.1667 27.7087Z"
                      stroke={`${location.pathname === '/maker-io' ? '#8A0000' : '#00727A'}`} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <span>Home</span>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="flex gap-x-2 justify-center">
                {
                  user['acc_type'] === 0 ?
                    <Link to="/admin/dashboard">
                      Dashboard
                    </Link> :
                    <Link
                      className="relative"
                      to={token ? "/cart" : "/login"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                        <path
                          d="M0 2.8125C0 2.56386 0.0987721 2.3254 0.274587 2.14959C0.450403 1.97377 0.68886 1.875 0.9375 1.875H3.75C3.95912 1.87506 4.16222 1.94503 4.327 2.0738C4.49177 2.20256 4.60877 2.38272 4.65937 2.58562L5.41875 5.625H27.1875C27.3252 5.62513 27.4611 5.65557 27.5857 5.71416C27.7102 5.77275 27.8204 5.85805 27.9082 5.96401C27.9961 6.06996 28.0596 6.19397 28.0941 6.32722C28.1287 6.46047 28.1335 6.59969 28.1081 6.735L25.2956 21.735C25.2554 21.9498 25.1414 22.1439 24.9733 22.2836C24.8052 22.4232 24.5936 22.4998 24.375 22.5H7.5C7.28144 22.4998 7.06981 22.4232 6.90171 22.2836C6.7336 22.1439 6.61959 21.9498 6.57938 21.735L3.76875 6.76313L3.01875 3.75H0.9375C0.68886 3.75 0.450403 3.65123 0.274587 3.47541C0.0987721 3.2996 0 3.06114 0 2.8125ZM5.81625 7.5L8.27812 20.625H23.5969L26.0588 7.5H5.81625ZM9.375 22.5C8.38044 22.5 7.42661 22.8951 6.72335 23.5984C6.02009 24.3016 5.625 25.2554 5.625 26.25C5.625 27.2446 6.02009 28.1984 6.72335 28.9016C7.42661 29.6049 8.38044 30 9.375 30C10.3696 30 11.3234 29.6049 12.0267 28.9016C12.7299 28.1984 13.125 27.2446 13.125 26.25C13.125 25.2554 12.7299 24.3016 12.0267 23.5984C11.3234 22.8951 10.3696 22.5 9.375 22.5ZM22.5 22.5C21.5054 22.5 20.5516 22.8951 19.8484 23.5984C19.1451 24.3016 18.75 25.2554 18.75 26.25C18.75 27.2446 19.1451 28.1984 19.8484 28.9016C20.5516 29.6049 21.5054 30 22.5 30C23.4946 30 24.4484 29.6049 25.1516 28.9016C25.8549 28.1984 26.25 27.2446 26.25 26.25C26.25 25.2554 25.8549 24.3016 25.1516 23.5984C24.4484 22.8951 23.4946 22.5 22.5 22.5ZM9.375 24.375C9.87228 24.375 10.3492 24.5725 10.7008 24.9242C11.0525 25.2758 11.25 25.7527 11.25 26.25C11.25 26.7473 11.0525 27.2242 10.7008 27.5758C10.3492 27.9275 9.87228 28.125 9.375 28.125C8.87772 28.125 8.40081 27.9275 8.04918 27.5758C7.69754 27.2242 7.5 26.7473 7.5 26.25C7.5 25.7527 7.69754 25.2758 8.04918 24.9242C8.40081 24.5725 8.87772 24.375 9.375 24.375ZM22.5 24.375C22.9973 24.375 23.4742 24.5725 23.8258 24.9242C24.1775 25.2758 24.375 25.7527 24.375 26.25C24.375 26.7473 24.1775 27.2242 23.8258 27.5758C23.4742 27.9275 22.9973 28.125 22.5 28.125C22.0027 28.125 21.5258 27.9275 21.1742 27.5758C20.8225 27.2242 20.625 26.7473 20.625 26.25C20.625 25.7527 20.8225 25.2758 21.1742 24.9242C21.5258 24.5725 22.0027 24.375 22.5 24.375Z"
                          fill={`${location.pathname === '/cart' ? '#8A0000' : '#00727A'}`}/>
                      </svg>
                      <span
                        className={cartItem.length === 0 ? 'hidden' : " flex justify-center items-center w-[16px] h-[16px] absolute bottom-[-6px] right-[-8px] bg-redBase text-whiteFactory rounded-[50%] text-[12px]"}>
                          {cartItem.reduce((total, i) => total += i.qty, 0)}
                        </span>
                    </Link>}
                <span>Cart</span>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="flex items-center gap-x-2">
                {
                  user['acc_type'] === 0 ? null :
                    <>
                      <Link
                        className="relative"
                        to={token ? "/order" : "/login"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                          <path
                            d="M5 23.75V10H25V14.1125C25.9 14.3875 26.75 14.7875 27.5 15.325V10C27.5 8.6125 26.3875 7.5 25 7.5H20V5C20 3.6125 18.8875 2.5 17.5 2.5H12.5C11.1125 2.5 10 3.6125 10 5V7.5H5C3.6125 7.5 2.5125 8.6125 2.5125 10L2.5 23.75C2.5 25.1375 3.6125 26.25 5 26.25H14.6C14.225 25.475 13.975 24.6375 13.85 23.75H5ZM12.5 5H17.5V7.5H12.5V5Z"
                            fill={`${location.pathname === '/order' ? '#8A0000' : '#00727A'}`}/>
                          <path
                            d="M22.5 16.25C19.05 16.25 16.25 19.05 16.25 22.5C16.25 25.95 19.05 28.75 22.5 28.75C25.95 28.75 28.75 25.95 28.75 22.5C28.75 19.05 25.95 16.25 22.5 16.25ZM24.5625 25.4375L21.875 22.75V18.75H23.125V22.2375L25.4375 24.55L24.5625 25.4375Z"
                            fill={`${location.pathname === '/order' ? '#8A0000' : '#00727A'}`}/>
                        </svg>
                        <span
                          className={`${orders?.length === 0 && 'hidden'} flex justify-center items-center w-[16px] h-[16px] absolute bottom-[-6px] right-[-6px] bg-tealActive text-whiteFactory rounded-[50%] text-[12px]`}>
                          {orders?.length}
                        </span>
                      </Link>
                    </>
                }
                <span>Orders</span>
              </div>
            </Dropdown.Item>
          </Dropdown>
          {/*profile icon*/}
          <div className="">
            {token ?
              <Dropdown arrowIcon={false} inline label={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-7 h-7">
                  <path className="text-tealHover" strokeLinecap="round" strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              } style={{background: "none"}}>
                <Dropdown.Header>
                  {user.username}
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to={`/user/${user.id}`}>
                    Account
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button onClick={onLogout}>
                    Sign out
                  </button>
                </Dropdown.Item>
              </Dropdown>
              :
              <div
                className="flex justify-center items-center gap-x-2 transition duration-500 cursor-pointer hover:text-whiteFactory text-tealHover hover:bg-tealBase px-2 py-1 rounded-md font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <Link className="text-sm" to="/login">
                  Sign in
                </Link>
              </div>
            }
          </div>
          <div>
            <Fragment>
              <Accordion open={open === 1}>
                <AccordionHeader className="border-0 p-0" onClick={() => handleOpen(1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className={`w-6 h-6`}>
                    <path className="text-tealHover" strokeLinecap="round" strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                  </svg>
                </AccordionHeader>
              </Accordion>
            </Fragment>
          </div>
        </div>
      </section>
      <div className="w-full">
        <Fragment>
          <Accordion open={open === 1}>
            <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>
              {/*<input className="w-full" placeholder="Search..." type="text"/>*/}
              <input type="text"
                     placeholder="Search..."
                     className="w-full rounded-md focus:ring-0 focus:border-tealBase border-2 border-tealBase"
                     onChange={event => {
                       setSearchInput(event.target.value)
                     }}/>
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </nav>
  );
};


