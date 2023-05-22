import {useAuthContext} from "../../context/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import ChatContext from "../../context/ChatContext.jsx";
import {Sender} from "../../components/ChatComponent/Sender.jsx";
import {Replier} from "../../components/ChatComponent/Replier.jsx";
import {Link} from "react-router-dom";

export const CustomerService = () => {
  const {user, token} = useAuthContext();
  const {messageReFetch, message, sendMessage, handleMessage, findChat, setSeen, initChat} = useContext(ChatContext);
  useEffect(() => {
    initChat(user.username, 'admin');
    messageReFetch();
    setSeen(message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id), user.username)
  }, []);
  const [messageInput, setMessageInput] = useState('');

  if(token) {
    return (
      <>
        <main className="flex flex-col items-center w-full min-h-screen text-gray-800">
          <div
            className="flex flex-col flex-grow w-full max-w-xl bg-white border-blackFactory border shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {message?.filter(msg => {
                  return msg.chat_id === findChat(user.username, 'admin')?.id
                }).length === 0 &&
                <>
                  <div>
                    Welcome to customer service
                  </div>
                  <div>
                    We will try our best to get back to you as soon as possible
                  </div>
                </>
              }
              {message?.filter(msg => {
                return msg.chat_id === findChat(user.username, 'admin')?.id
              }).map(msg => {
                if (msg.sender_id === user.username) {
                  return (
                    <Sender key={msg.id} time={msg.time_sent} messageContent={msg.msg_content}/>
                  );
                } else {
                  return <Replier key={msg.id} time={msg.time_sent} messageContent={msg.msg_content}/>
                }
              })
              }
            </div>

            <div className="flex items-center gap-x-2 bg-gray-300 p-4">
              <input
                onKeyDown={event => {event.key === 'Enter' && sendMessage(setMessageInput)}}
                value={messageInput}
                onChange={event => {
                  setMessageInput(event.target.value);
                  handleMessage({username: 'admin'}, event)
                }}
                className="w-full flex items-center h-10 rounded px-3 text-sm" type="text"
                placeholder="Type your message…"/>
              <button onClick={() => {
                sendMessage(setMessageInput)
              }} className="bg-[#1C64F2] text-whiteFactory font-semibold rounded-md px-3 py-1 flex items-center hover:bg-blue-700 cursor-pointer">
                send
              </button>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <main className="flex flex-col items-center w-full min-h-screen text-gray-800">
        <div
          className="flex flex-col flex-grow w-full max-w-xl bg-white border-blackFactory border shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            <div>
              You need an account to contact us
            </div>
            <Link className={"font-semibold text-blueBase"} to={'/signup'}>
              Sign Up here
            </Link>
          </div>
        </div>
      </main>
    );
  }
};
