import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import CartContext from "../context/CartContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";
import ProductContext from "../context/ProductContext.jsx";

export const NavBar = () => {
  const {onLogout, token, user} = useAuthContext()
  const {cartItem, getCartItem} = useContext(CartContext);
  const {invoices} = useContext(InvoiceContext)
  const {message, findChat} = useContext(ChatContext);
  const {items, searchInput, itemsQueryReFetch, setSearchInput} = useContext(ProductContext);

  useEffect(() => {
    itemsQueryReFetch();
  }, []);

  useEffect(() => {
    getCartItem();
  }, []);
  const readMessage = message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id && msg.is_read === 0 && msg.sender_id !== user.username);
  const orders = invoices?.filter((inv) => inv.user_id === user.id && inv.status !== 3);

  return (
    <nav className="z-50 fixed w-full top-0 bg-whiteFactory flex px-36 py-4 justify-between items-center">
      <div className="flex flex-row items-center">
        <Link to="/">
          <img width="100" src="/assets/images/makerio.png" alt=""/>
        </Link>
        <Link
        // onClick={() => {initChat(user.username, 'admin')}}
          className={"flex relative"} to="/customer-service">
          <img className="w-[20px] h-[20px] ml-3" src="/assets/images/customer-service.png" alt=""/>
          <span
            className={`${readMessage?.length === 0 && 'hidden'} absolute top-[-10px] right-[-10px] bg-tealActive w-[18px] h-[18px] rounded-[50%] flex items-center justify-center text-whiteFactory text-[12px]`}>
            {readMessage?.length}
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-x-12">
        <div className="w-[384px]">
          <input type="text"
                 className="w-[100%] px-12 search-bar py-2"
                 onChange={event => {
                   setSearchInput(event.target.value)
                 }}
          />
        </div>

      </div>
      <div className="flex items-end gap-x-6">
        <div className="highlight-hover text-[#8A0000]">
          <Link to="/maker-io">
            <img src="/assets/images/homeicon.png" alt=""/>
          </Link>
        </div>
        <div className="highlight-hover relative">
          {
            user['acc_type'] === 0 ? <>
                  <Link to="/admin/dashboard">
                    Dashboard
                  </Link>
              </> :
              <><Link to={
                token ? "/cart" : "/login"
              }>
                <img src="/assets/images/carticon.png" alt=""/>
              </Link>
                <span
                  className={cartItem.length === 0 ? 'hidden' : " flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-redBase text-whiteFactory rounded-[50%] text-[12px]"}>
            {cartItem.reduce((total, i) => total += i.qty, 0)}
          </span></>
          }

        </div>
        <div className="highlight-hover">
          {
            user['acc_type'] === 0 ? null :
              <><Link className="relative" to={
                token ? "/order" : "/login"
              }>
                <img src="/assets/images/ordericon.png" alt=""/>
                <span
                  className={`${orders?.length === 0 && 'hidden'} flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-tealActive text-whiteFactory rounded-[50%] text-[12px]`}>
              {orders?.length}
            </span>
              </Link></>
          }

        </div>

      </div>
      {
        token ? (
            <>
              <div className='flex'>
                <div className="mr-6 highlight-hover text-[#3C3C3C] font-semibold">
                  {
                    user['acc_type'] === 0 ? <p>
                      {user?.firstName}
                    </p> :
                      <Link to={`/user/${user.id}`}>
                        <img src="/assets/images/pficon.png" alt="" />
                      </Link>
                  }
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


