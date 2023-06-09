import Axios from "axios";
import React, {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../context/UserContext.jsx";
import {act} from "react-dom/test-utils";
import {useAuthContext} from "../../context/AuthContext.jsx";
import ChatContext from "../../context/ChatContext.jsx";
import {dividerClasses} from "@mui/material";
import {ImagePreview} from "../../components/ImagePreview.jsx";
import {ImageExpand} from "../../components/ImageExpand.jsx";
import {AdminSend} from "../../components/AdminComponents/AdminSend.jsx";
import {AdminReply} from "../../components/AdminComponents/AdminReply.jsx";
import {ChatListItem} from "../../components/AdminComponents/ChatListItem.jsx";
import {Link} from "react-router-dom";
import {Spinner} from "flowbite-react";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
export const Chat = () => {
  const [activeUser, setActiveUser] = useState({});
  const {users, getUsers} = useContext(UserContext);
  const [searchInput, setSearchInput] = useState('')
  const [filteredUser, setFilteredUser] = useState([]);
  const handleSearchUser = (e) => {
    setSearchInput(e.target.value)
    setFilteredUser(
      users.filter((user) => {
        if (user.username.toLowerCase().includes(searchInput.toLowerCase())) {
          return user
        } else if (searchInput === '') {
          return user
        }
      })
    )
  }

  const {
    messageImage,
    chatReFetch,
    findChat,
    initChat,
    handleMessage,
    sendMessage,
    message,
    messageReFetch,
    getLatestMessage,
    setSeen,
    setMessageImage,
    getChat,
    chats,
    messageInput,
    setMessageInput,
    chatScroll,
    setLoadingSend,
    loadingSend,
  } = useContext(ChatContext);

  // const [messageInput, setMessageInput] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    chatScroll.current?.scrollIntoView({behavior: "smooth"})
  })
  // useEffect(() => {
  //   // chats.forEach(chat => console.log(chat))
  //   chats.sort((a, b) => {
  //     return new Date(b.latest_msg) - new Date(a.latest_msg)
  //   }).forEach(chat => console.log(chat))
  //   // chats.sort((a, b) => console.log(a)).forEach(chat => console.log(chat));
  // }, [])

  const GetLatestMsg = ({usr, userNotification}) => {
    const WrapComponent = ({children}) => {
      return (
        <span
          className={`${userNotification?.length > 0 && 'font-semibold'}` +
            " block ml-2 text-sm text-gray-600"}>
          {children}
        </span>
      );
    }
    if (getLatestMessage('admin', usr?.username)?.msg_content && getLatestMessage('admin', usr?.username)?.image) {
      return (
        <WrapComponent children={`${usr.username} sent a photo`}/>
      );
    }
    if (getLatestMessage('admin', usr?.username)?.image) {
      return (
        <WrapComponent children={`${usr?.username} sent a photo`}/>
      );
    }
    if (getLatestMessage('admin', usr?.username)?.msg_content) {
      return (
        <WrapComponent children={getLatestMessage('admin', usr?.username)?.msg_content}/>
      )
    }
  }

  return (
    <>
      <div className="mx-2 w-full h-screen">
        <div className="min-w-full h-full rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-gray-300 lg:col-span-1">

            {/*Search Bar*/}
            <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                       viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input ref={ref} type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                       name="search"
                       placeholder="Search..."
                       onChange={(e) => handleSearchUser(e)}
                       required/>
                <div
                  className={`flex flex-col z-10 border-b border-gray-200 rounded-md absolute top-12 bg-white w-full cursor-pointer ${searchInput === "" && 'hidden'}`}>
                  {filteredUser?.length === 0 && <div className="mx-auto mt-2"> No user found</div>}
                  {filteredUser?.slice(0, 5).map((usr, key) => {
                    const unreadMessages = message?.filter((msg) => msg.is_read === 0 && msg.sender_id === usr?.username);
                    const userNotification = message?.filter((msg) => msg.is_read === 0 && msg.sender_id === usr.username);
                    // const timePrefix = new Date(message.filter(msg => msg.sender_id === usr?.username)[0]?.time_sent)?.getHours();
                    const timePrefix = new Date(getLatestMessage(usr?.username, 'admin')?.time_sent)?.getHours();
                    return (
                      <li
                        onClick={() => {
                          setActiveUser(usr);
                          initChat('admin', usr?.username);
                          setSeen(unreadMessages, 'admin');
                          setMessageInput('');
                          setSearchInput('')
                          messageReFetch();
                        }}
                        key={usr.id}
                        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                        <img className="object-cover w-10 h-10 rounded-full"
                             src={`https://robohash.org/${usr.username}`} alt="username"/>
                        <div className="w-full pb-2">
                          <div className="flex justify-between">
                            <span className="block ml-2 font-semibold text-gray-600">
                              {usr.username}
                            </span>
                            <span className="block ml-2 text-sm text-gray-600">
                            {/*time stamp*/}
                              {/*{message.filter(msg => msg.sender_id === usr?.username).length > 0 && message.filter(msg => msg.sender_id === usr?.username)[0]?.time_sent.slice(10).slice(0, 6) +`${timePrefix >= 12 ? ' PM' : ' AM'}`}*/}
                              {getLatestMessage('admin', usr?.username) && getLatestMessage('admin', usr?.username)?.time_sent.slice(10).slice(0, 6) + `${timePrefix >= 12 ? ' PM' : ' AM'}`}
                          </span>
                          </div>
                          <div className="flex justify-between pr-12">
                            {/*latest msg*/}
                            <GetLatestMsg usr={usr} userNotification={userNotification}/>
                            <span className={`${userNotification?.length === 0 && 'hidden'}` +
                              " w-[20px] h-[20px] bg-blueBase text-whiteFactory flex justify-center items-center rounded-[50%] text-xs"}>
                              {/*{getLatestMessage('admin', usr.username)?.length}*/}
                              {userNotification?.length}
                          </span>
                          </div>
                        </div>
                      </li>
                    )
                  })
                  }
                </div>
              </div>
            </div>
            {/*Search Bar*/}

            {/*User List*/}
            <ul className="overflow-auto">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              {chats?.length === 0 &&
                <div>Empty chat box, <span className="font-semibold" onClick={() => ref.current.focus()}>Maybe contact a few customers?</span>
                </div>}
              {chats?.sort((a, b) => new Date(b?.latest_msg) - new Date(a?.latest_msg)).map(chat => {
                return (
                  <ChatListItem key={chat?.id} chat={chat} GetLatestMsg={GetLatestMsg}
                                setActiveUser={setActiveUser}
                                setMessageInput={setMessageInput}/>
                )
              })}
            </ul>
            {/*User List*/}
          </div>

          <div className={`lg:col-span-2 lg:block ${Object.keys(activeUser).length === 0 && 'm-auto'}`}>
            <div
              className={`${Object.keys(activeUser).length === 0 ? 'w-full bg-blueBase text-whiteFactory px-3 py-1 rounded-3xl text-sm' : 'hidden'}`}>
              <div>
                Select a chat to start messaging
              </div>
            </div>
            <div
              className={`${Object.keys(activeUser).length === 0 && 'hidden'} flex flex-col justify-between h-full w-full`}>
              <div>
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img className="object-contain w-10 h-10 rounded-full"
                       src={`https://robohash.org/${activeUser?.username}`} alt="username"/>
                  <span className="block ml-2 font-bold text-gray-600">{activeUser?.username}</span>
                  <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                </div>
                <div className="relative w-full p-6 overflow-y-auto">
                  <ul className="space-y-2">
                    {message?.filter(msg => msg.chat_id === getChat('admin', activeUser?.username)[0]?.id).map((msg) => {
                      if (msg.receiver_id === activeUser?.username) {
                        return (
                          <AdminSend key={msg.id} msg={msg}/>
                        );
                      } else {
                        return (
                          <AdminReply key={msg.id} msg={msg}/>
                        );
                      }
                    })}
                  </ul>
                  <div ref={chatScroll}></div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <label htmlFor="file_upload" className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                  </svg>
                </label>

                <input
                  className={"hidden"}
                  id="file_upload"
                  type="file"
                  accept="image/png, image/jpeg,image/jpg"
                  onChange={e => {
                    setMessageImage(e.target.files[0])
                    e.target.files[0] && setOpen(true);
                  }}
                />
                <input disabled={loadingSend || false}
                       onKeyDown={event => {
                         event.key === 'Enter' && sendMessage('admin', activeUser?.username)
                       }} value={messageInput}
                       onChange={event => {
                         // if(event.target.value !== ' ') {
                         // setMessageInput(event.target.value);
                         // }
                         handleMessage(event)
                       }} type="text" placeholder="Message"
                       className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                       name="message" required/>
                <button disabled={loadingSend || false} onClick={() => {
                  sendMessage('admin', activeUser?.username)
                }}>
                  {!loadingSend ? (
                    <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                  ) : (
                    <Spinner color={"purple"} size={"md"}/>
                  )}
                </button>
                <ImagePreview
                  setOpen={setOpen} open={open}
                  receiver={activeUser?.username} sender={'admin'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
