import {useAuthContext} from "../../context/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import ChatContext from "../../context/ChatContext.jsx";
import {Sender} from "../../components/ChatComponent/Sender.jsx";

export const CustomerService = () => {
  const {user} = useAuthContext();
  const {messageReFetch, message, sendMessage, handleMessage} = useContext(ChatContext);
  // const [messageContent, setMessageContent] = useState('');
  useEffect(() => {
    messageReFetch();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center w-full min-h-screen text-gray-800">
        <div
          className="flex flex-col flex-grow w-full max-w-xl bg-white border-blackFactory border shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {/*replier*/}
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
              {/*pfp*/}
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              {/*pfp*/}
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">2 min ago</span>
              </div>
            </div>
            {/*replier*/}

            {
              message?.map(msg => {
                return (
                  <Sender messageContent={msg.msg_content}/>
                );
              })
            }


          </div>

          <div className="flex items-center gap-x-2 bg-gray-300 p-4">
            <input onChange={event => handleMessage(event)}
                   className="w-full flex items-center h-10 rounded px-3 text-sm" type="text"
                   placeholder="Type your message…"/>
            <button onClick={() => {
              sendMessage(messageContent)
            }}
                    className="bg-[#1C64F2] text-whiteFactory font-semibold rounded-md px-3 py-1 flex items-center hover:bg-blue-700 cursor-pointer">
              send
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
