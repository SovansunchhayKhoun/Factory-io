import {createContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import UserContext from "./UserContext.jsx";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
console.log(import.meta.env.VITE_APP_URL);
const ChatContext = createContext();
export const ChatProvider = ({children}) => {
  const {data: chat, refetch: chatReFetch, isLoading: chatLoading} = useQuery(['chat'], () => {
    return Axios.get('chat').then((res) => res.data.data);
  })

  const {data: message, refetch: messageReFetch, isLoading: messageLoading} = useQuery(['message'], () => {
    return Axios.get('message').then((res) => res.data.data);
  });

  const {user} = useAuthContext();

  const [messagePost, setMessagePost] = useState({});

  const handleMessage = (event) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    // setMessageContent(event.target.value);
    setMessagePost({
      admin_id: -99,
      chat_id: 1,
      sender_id: -99,
      msg_content: event.target.value,
      time_sent: currentDate,
    })
  }
  const sendMessage = async () => {
    try {
      await Axios.post('message', messagePost);
      await messageReFetch();
    } catch (msg) {
      console.log(msg.response.data.errors);
    }
  }

  return (
    <>
      <ChatContext.Provider value={{
        chat,
        handleMessage,
        chatReFetch,
        sendMessage,
        message,
        messageReFetch,
      }}>
        {children}
      </ChatContext.Provider>
    </>
  );
};
export default ChatContext;
