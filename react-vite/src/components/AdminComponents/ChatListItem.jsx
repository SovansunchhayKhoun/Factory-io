import ChatContext from "../../context/ChatContext.jsx";
import {useContext, useState} from "react";
import UserContext from "../../context/UserContext.jsx";

export const ChatListItem = ({chat, GetLatestMsg, setActiveUser, setMessageInput}) => {
  const {getLatestMessage, message, initChat, messageReFetch, setSeen} = useContext(ChatContext);
  const {users} = chat;
  const {username, id} = users[0];
  const unreadMessages = message?.filter((msg) => msg.is_read === 0 && msg.sender_id === username);
  const userNotification = message?.filter((msg) => msg.is_read === 0 && msg.sender_id === username);
  const timePrefix = new Date(getLatestMessage(username, 'admin')?.time_sent)?.getHours();
    return (
        <>
          <li
            onClick={() => {
              setActiveUser(users[0])
              initChat('admin', username);
              setSeen(unreadMessages, 'admin');
              setMessageInput('');
              messageReFetch();
            }}
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
            <img className="object-cover w-10 h-10 rounded-full"
                 src={`https://robohash.org/${username}`} alt="username"/>
            <div className="w-full pb-2">
              <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {username}
                      </span>
                <span className="block ml-2 text-sm text-gray-600">
                      {/*time stamp*/}
                  {/*{message.filter(msg => msg.sender_id === username).length > 0 && message.filter(msg => msg.sender_id === username)[0]?.time_sent.slice(10).slice(0, 6) +`${timePrefix >= 12 ? ' PM' : ' AM'}`}*/}
                  {getLatestMessage('admin', username) && getLatestMessage('admin', username)?.time_sent.slice(10).slice(0, 6) + `${timePrefix >= 12 ? ' PM' : ' AM'}`}
                    </span>
              </div>
              <div className="flex justify-between pr-12">
                {/*latest msg*/}
                <GetLatestMsg usr={users[0]} userNotification={userNotification}/>
                <span className={`${userNotification?.length === 0 && 'hidden'}` +
                  " w-[20px] h-[20px] bg-blueBase text-whiteFactory flex justify-center items-center rounded-[50%] text-xs"}>
                        {/*{getLatestMessage('admin', usr.username)?.length}*/}
                  {userNotification?.length}
                    </span>
              </div>
            </div>
          </li>
        </>
    );
};
