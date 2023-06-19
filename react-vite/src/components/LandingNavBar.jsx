import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import React, {useContext, useEffect, useState} from "react";
import AxiosClient from "../axios-client.js";
import ProductContext from "../context/ProductContext.jsx";
import {ProfileDropdown} from "./ui/NavBarui/ProfileDropdown.jsx";

export const LandingNavBar = () => {

  const [searchInput, setSearchInput] = useState('')
  const [filteredItem, setFilteredItem] = useState([])
  const {items} = useContext(ProductContext);
  // const handleSearchInput = (e) => {
  //   setSearchInput(e.target.value)
  //   setFilteredItem(
  //     items?.filter((item) => {
  //       if (searchInput !== "") {
  //         if (item?.name.toLowerCase().includes(searchInput.toLowerCase()) || item?.type.toLowerCase().includes(searchInput.toLowerCase())) {
  //           return item
  //         }
  //       }
  //     })
  //   )
  // }

  // Not signed in Navbar
  const [navBar, setNavBar] = useState([
    {name: "Home", to: "", img: {imgSrc: "", imgWidth: 0}},
    {name: "Community", to: "community", img: {imgSrc: "", imgWidth: 0}},
    {name: "R&D", to: "rd", img: {imgSrc: "", imgWidth: 0}},
    {name: "Contest", to: "contest", img: {imgSrc: "", imgWidth: 0}},
    {name: "", to: "/makerio", img: {imgSrc: "/assets/images/makerio.png", imgWidth: 100}},
  ]);
  const {user,token, setUser,isLoading, onLogout} = useAuthContext();
  if (token) {
    return (
      <>
        <nav className="fixed top-0 w-full bg-whiteFactory z-50 flex justify-between items-center
        min-[1920px]:px-36 min-[1920px]:py-4
        lg:px-16 lg:py-3
        md:px-6 md:py-2
        px-6 py-2
      ">
          <div className="flex items-center gap-x-6">
            {/*Factory logo*/}
            <Link to="/" className="">
              <img className="lg:w-[120px] md:w-[120px] w-[100px]" src="/assets/images/factory.png" alt=""/>
            </Link>
            {/*customer-service*/}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" fill="none">
                <path
                  d="M23.4 18.4499C23.8375 17.3874 24.075 16.2499 24.075 14.9999C24.075 14.0999 23.9375 13.2374 23.7 12.4374C22.8875 12.6249 22.0375 12.7249 21.15 12.7249C19.3325 12.7268 17.5411 12.2918 15.9269 11.4564C14.3127 10.621 12.923 9.40982 11.875 7.92487C10.7539 10.6376 8.63891 12.8196 5.9625 14.0249C5.9125 14.3374 5.9125 14.6749 5.9125 14.9999C5.9125 16.1933 6.14756 17.375 6.60424 18.4775C7.06093 19.5801 7.73031 20.5819 8.57417 21.4257C10.2784 23.1299 12.5898 24.0874 15 24.0874C16.3125 24.0874 17.575 23.7999 18.7125 23.2874C19.425 24.6499 19.75 25.3249 19.725 25.3249C17.675 26.0124 16.0875 26.3499 15 26.3499C11.975 26.3499 9.0875 25.1624 6.9625 23.0249C5.67 21.7363 4.70921 20.1536 4.1625 18.4124H2.5V12.7249H3.8625C4.2753 10.7155 5.22437 8.85538 6.60899 7.34186C7.99361 5.82834 9.76214 4.71788 11.7269 4.12832C13.6917 3.53876 15.7794 3.49209 17.7686 3.99326C19.7577 4.49442 21.5741 5.52474 23.025 6.97487C24.6003 8.54394 25.6748 10.545 26.1125 12.7249H27.5V18.4124H27.425L22.975 22.4999L16.35 21.7499V19.6624H22.3875L23.4 18.4499ZM11.5875 14.7124C11.9625 14.7124 12.325 14.8624 12.5875 15.1374C12.8513 15.4033 12.9993 15.7628 12.9993 16.1374C12.9993 16.512 12.8513 16.8714 12.5875 17.1374C12.325 17.3999 11.9625 17.5499 11.5875 17.5499C10.8 17.5499 10.1625 16.9249 10.1625 16.1374C10.1625 15.3499 10.8 14.7124 11.5875 14.7124ZM18.4 14.7124C19.1875 14.7124 19.8125 15.3499 19.8125 16.1374C19.8125 16.9249 19.1875 17.5499 18.4 17.5499C17.6125 17.5499 16.975 16.9249 16.975 16.1374C16.975 15.7594 17.1251 15.397 17.3924 15.1297C17.6596 14.8625 18.0221 14.7124 18.4 14.7124Z"
                  fill="#2D335B"/>
              </svg>
            </div>
          </div>
          {/*search bar*/}

          <div className="md:flex md:items-center md:gap-x-12 lg:w-[384px] hidden">
            <input type="text"
                   placeholder="Search..."
                   className="w-[100%] px-12 search-bar py-1 border-none"/>
          </div>

          <div className="flex items-center gap-6">
            {/*home icon*/}
            <Link to={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="23" viewBox="0 0 28 23" fill="none">
                <path
                  d="M11.3333 22.6667V14.6667H16.6667V22.6667H23.3333V12H27.3333L14 0L0.666656 12H4.66666V22.6667H11.3333Z"
                  fill="#1D1D1F"/>
              </svg>
            </Link>
            {/*global icon*/}
            <Link to="/explore">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <g clipPath="url(#clip0_140_1010)">
                  <path
                    d="M12.5 24.1071C18.9104 24.1071 24.1071 18.9104 24.1071 12.5C24.1071 6.08952 18.9104 0.892822 12.5 0.892822C6.08955 0.892822 0.892853 6.08952 0.892853 12.5C0.892853 18.9104 6.08955 24.1071 12.5 24.1071Z"
                    stroke="#1D1D1F" strokeLinecap="round" strokeLinejoin="round"/>
                  <path
                    d="M0.892853 12.5H24.1071M16.9643 12.5C16.745 16.7446 15.1816 20.8095 12.5 24.1071C9.81843 20.8095 8.25499 16.7446 8.03571 12.5C8.25499 8.25534 9.81843 4.19041 12.5 0.892822C15.1816 4.19041 16.745 8.25534 16.9643 12.5Z"
                    stroke="#1D1D1F" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_140_1010">
                    <rect width="25" height="25" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Link>
            {/*bell icon*/}
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <g clipPath="url(#clip0_140_1014)">
                  <path
                    d="M24.3825 20.8725C23.6593 20.2278 23.0261 19.4887 22.5 18.675C21.9257 17.552 21.5814 16.3255 21.4875 15.0675V11.3625C21.4925 9.38676 20.7758 7.47716 19.4721 5.99253C18.1683 4.5079 16.3674 3.55044 14.4075 3.30005V2.33255C14.4075 2.067 14.302 1.81233 14.1142 1.62456C13.9265 1.43679 13.6718 1.3313 13.4063 1.3313C13.1407 1.3313 12.886 1.43679 12.6983 1.62456C12.5105 1.81233 12.405 2.067 12.405 2.33255V3.31505C10.4627 3.58349 8.68348 4.54674 7.3969 6.02638C6.11032 7.50602 5.40355 9.40178 5.40751 11.3625V15.0675C5.31357 16.3255 4.96934 17.552 4.39501 18.675C3.87817 19.4868 3.25515 20.2259 2.54251 20.8725C2.4625 20.9428 2.39839 21.0293 2.35442 21.1263C2.31045 21.2233 2.28764 21.3286 2.28751 21.435V22.455C2.28751 22.654 2.36652 22.8447 2.50718 22.9854C2.64783 23.126 2.83859 23.205 3.03751 23.205H23.8875C24.0864 23.205 24.2772 23.126 24.4178 22.9854C24.5585 22.8447 24.6375 22.654 24.6375 22.455V21.435C24.6374 21.3286 24.6146 21.2233 24.5706 21.1263C24.5266 21.0293 24.4625 20.9428 24.3825 20.8725ZM3.84751 21.705C4.54531 21.031 5.1597 20.2756 5.67751 19.455C6.40097 18.0987 6.82308 16.6021 6.91501 15.0675V11.3625C6.88526 10.4836 7.0327 9.6076 7.34854 8.7868C7.66438 7.96599 8.14216 7.21714 8.75344 6.58482C9.36472 5.95251 10.097 5.44967 10.9066 5.10625C11.7163 4.76283 12.5868 4.58585 13.4663 4.58585C14.3457 4.58585 15.2162 4.76283 16.0259 5.10625C16.8355 5.44967 17.5678 5.95251 18.1791 6.58482C18.7903 7.21714 19.2681 7.96599 19.584 8.7868C19.8998 9.6076 20.0473 10.4836 20.0175 11.3625V15.0675C20.1094 16.6021 20.5315 18.0987 21.255 19.455C21.7728 20.2756 22.3872 21.031 23.085 21.705H3.84751Z"
                    fill="black"/>
                  <path
                    d="M13.5 25.71C13.9724 25.6991 14.4258 25.5215 14.7799 25.2086C15.1341 24.8956 15.3661 24.4675 15.435 24H11.49C11.5608 24.4802 11.8037 24.9184 12.1735 25.2329C12.5432 25.5475 13.0146 25.717 13.5 25.71Z"
                    fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_140_1014">
                    <rect width="27" height="27" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <ProfileDropdown to="/user" user={user} arrowIcon={true}/>
          </div>
        </nav>
      </>
    )
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-whiteFactory z-50 flex justify-between items-center
        min-[1920px]:px-36 min-[1920px]:py-4
        lg:px-16 lg:py-3
        md:px-6 md:py-2
        px-6 py-2
      ">
        <Link to="/" className="">
          <img className="lg:w-[120px] md:w-[120px] w-[100px]" src="/assets/images/factory.png" alt=""/>
        </Link>

        <ul className="flex items-center gap-x-7">
          {navBar.map((item, key) => {
            return (
              <li key={item.name}>
                <div className={`${!item.name && 'hidden'} highlight-hover text-[#3C3C3C]`}>
                  <Link to={`/${item.to}`}>
                    {item.name}
                  </Link>
                </div>
                <div className={`${!item.img.imgSrc && 'hidden'}`}>
                  <Link to="/makerio">
                    <img width={`${item.img.imgWidth}`} src={`${item.img.imgSrc}`} alt=""/>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex justify-end gap-x-2">
          <div>
            <Link to="/login" className="highlight-hover text-[#3C3C3C]">
              Sign in
            </Link>
          </div>
          <div>
            <Link to="/signup" className="highlight-hover text-[#3C3C3C]">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
