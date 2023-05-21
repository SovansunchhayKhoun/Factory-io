import Axios from "axios";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../context/UserContext.jsx";
import {act} from "react-dom/test-utils";
import {useAuthContext} from "../../context/AuthContext.jsx";
import ChatContext from "../../context/ChatContext.jsx";
import {dividerClasses} from "@mui/material";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
export const Chat = () => {
  const [activeUser, setActiveUser] = useState({});
  const {
    chatReFetch,
    chat,
    findChat,
    initChat,
    handleMessage,
    sendMessage,
    message,
    messageReFetch,
    getLatestMessage,

  } = useContext(ChatContext);

  useEffect(() => {
    messageReFetch();
    chatReFetch()
  }, []);

  const [messageInput, setMessageInput] = useState('');

  return (
    <>
      <main className="min-w-full m-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
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
                <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                       name="search"
                       placeholder="Search..." required/>
              </div>
            </div>
            {/*Search Bar*/}

            {/*User List*/}
            <ul className="overflow-auto h-[32rem]">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              {chat?.map((ch) => {
                const {users, messages} = ch;
                if (messages.length > 0) {
                  return (
                    <li
                      onClick={() => {
                        initChat('admin', users[0].username);
                        setMessageInput('')
                        setActiveUser(users[0])
                      }}
                      key={users[0].id}
                      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img className="object-cover w-10 h-10 rounded-full"
                           src="/assets/images/seangly.jpg" alt="username"/>
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {users[0].username}
                          </span>
                          <span className="block ml-2 text-sm text-gray-600">
                            {/*25 minutes*/}
                          </span>
                        </div>
                        <span
                          className="block ml-2 text-sm text-gray-600 font-semibold">
                          {getLatestMessage('admin', users[0].username)?.msg_content}
                        </span>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
            {/*User List*/}
          </div>

          <div className={`lg:col-span-2 lg:block ${Object.keys(activeUser).length === 0 && 'm-auto'}`}>
            <div
              className={`${Object.keys(activeUser).length === 0 ? 'flex justify-center bg-blueBase text-whiteFactory px-3 py-1 rounded-3xl text-sm' : 'hidden'}`}>
              Select a chat to start messaging
            </div>
            <div className={`${Object.keys(activeUser).length === 0 && 'hidden'} w-full`}>
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img className="object-contain w-10 h-10 rounded-full"
                     src="/assets/images/doung.jpg" alt="username"/>
                <span className="block ml-2 font-bold text-gray-600">{activeUser?.username}</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  {message?.filter(msg => msg.chat_id === findChat('admin', activeUser?.username)?.id).map((msg) => {
                    if (msg.receiver_id === activeUser?.username) {
                      return (
                        <li key={msg.id} className="flex justify-end items-center gap-x-2">
                          <span className="text-xs block text-grayFactory">{msg.time_sent}</span>
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span className="block">{msg.msg_content}</span>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={msg.id} className="flex items-center gap-x-2 justify-start">
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span className="block">{msg.msg_content}</span>
                          </div>
                          <span className="text-xs block text-grayFactory">{msg.time_sent}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap='round' cap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                  </svg>
                </button>

                <input onKeyDown={event => {
                  event.key === 'Enter' && sendMessage(setMessageInput)
                }} value={messageInput} onChange={event => {
                  setMessageInput(event.target.value);
                  handleMessage(activeUser, event)
                }} type="text" placeholder="Message"
                       className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                       name="message" required/>
                <button onClick={() => {
                  sendMessage(setMessageInput)
                }} type="">
                  <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};