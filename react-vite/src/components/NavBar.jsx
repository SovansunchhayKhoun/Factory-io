import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import CartContext from "../context/CartContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";

export const NavBar = () => {
  const {onLogout, token, user} = useAuthContext()
  const {cartItem, getCartItem} = useContext(CartContext);
  const {invoices} = useContext(InvoiceContext)
  useEffect(() => {
    getCartItem();
  }, []);
  const {message, findChat} = useContext(ChatContext);
  const readMessage = message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id && msg.is_read === 0);
  const orders = invoices?.filter((inv) => inv.user_id === user.id && inv.status !== 3);

  return (
    <nav className="z-50 fixed w-full top-0 bg-whiteFactory flex px-36 py-4 justify-between items-center">
      <div className="flex flex-row items-center">
        <Link to="/">
          <img width="100" src="/assets/images/makerio.png" alt=""/>
        </Link>
        <Link className={"flex relative"} to="/customer-service">
          <img className="w-[20px] h-[20px] ml-3" src="/assets/images/customer-service.png" alt=""/>
          <span
            className={`${readMessage?.length === 0 && 'hidden'} absolute top-[-10px] right-[-10px] bg-tealActive w-[18px] h-[18px] rounded-[50%] flex items-center justify-center text-whiteFactory text-[12px]`}>
            {readMessage?.length}
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-x-12">
        <div className="highlight-hover text-[#8A0000]">
          <Link to="/maker-io">
            Home
          </Link>
        </div>
        {
          token ? (
              <>
                {
                  user['acc_type'] === 0 ? (
                    <>
                      <div className="highlight-hover">
                        <Link to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </div>
                    </>
                  ) : null
                }
              </>
            ) :
            null
        }

        <div>
          <Link to="/">
            <img className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110" width="100"
                 src="/assets/images/factory.png" alt=""/>
          </Link>
        </div>
        <div className="highlight-hover relative">
          <Link to={
            token ? "/cart" : "/login"
          }>
            Cart
          </Link>
          <span
            className={cartItem.length === 0 ? 'hidden' : " flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-redBase text-whiteFactory rounded-[50%] text-[12px]"}>
            {cartItem.reduce((total, i) => total += i.qty, 0)}
          </span>
        </div>
        <div className="highlight-hover">
          <Link className="relative" to={
            token ? "/order" : "/login"
          }>
            <span>Order</span>
            <span
              className={`${orders?.length === 0 && 'hidden'} flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-tealActive text-whiteFactory rounded-[50%] text-[12px]`}>
              {orders?.length}
            </span>
          </Link>
        </div>

      </div>
      {
        token ? (
            <>
              <div className='flex'>
                <div className="mr-6 highlight-hover text-[#3C3C3C] font-semibold">
                  <Link to={`/user/${user.id}`}>
                    {user?.firstName}
                  </Link>
                </div>
                <div className="highlight-hover text-[#3C3C3C]">
                  <a onClick={onLogout}>
                    <div className="flex flex-row items-center">
                      Logout
                      <img className="w-[18px] h-[18px] ml-1.5" src="/assets/images/logout.png"/>
                    </div>
                  </a>
                </div>
              </div>
            </>
          ) :
          <>
            <div className="flex">
              <div className="mr-6 highlight-hover text-[#3C3C3C]">
                <Link to="/login">
                  Sign in
                </Link>
              </div>
              <div
                className="highlight-hover text-[#3C3C3C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <Link to="/signup">
                  <button className="px-4 py-[2px] text-black bg-redBase rounded-[20px] ">Sign up</button>
                </Link>
              </div>
            </div>
          </>
      }


    </nav>
  );
};


