import {createContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const ChatContext = createContext();
export const ChatProvider = ({children}) => {
  const [chatCopy, setChatCopy] = useState([]);
  const {data: chat, refetch: chatReFetch, isLoading: chatLoading} = useQuery(['chat'], () => {
    return Axios.get('chat').then((res) => {
      setChatCopy(res.data.data);
      return res.data.data;
    });
  })
  const {data: message, refetch: messageReFetch, isLoading: messageLoading} = useQuery(['message'], () => {
    return Axios.get('message').then((res) => res.data.data);
  });

  const {user} = useAuthContext();
  const [messagePost, setMessagePost] = useState({});

  const checkChatExist = (newChat) => {
    return chatCopy.some((copy) => {
      return (copy.sender_id === newChat.sender_id && copy.receiver_id === newChat.receiver_id) || (copy.sender_id === newChat.receiver_id && copy.receiver_id === newChat.sender_id)
    })
  };

  const getLatestMessage = (sender, receiver) => {
    return findChat(sender, receiver)?.messages[findChat(sender, receiver)?.messages.length - 1];
  }

  const initChat = async (sender, receiver) => {
    const newChat = {
      sender_id: sender,
      receiver_id: receiver,
    }

    if (!checkChatExist(newChat)) {
      try {
        await Axios.post('chat', newChat);
      } catch (msg) {
        console.log(msg.response.data.errors);
      }
    }
  }

  const findChat = (sender, receiver) => {
    return chatCopy.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)));
  }

  const handleMessage = (receiver, event) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    setMessagePost({
      receiver_id: receiver.username,
      chat_id: findChat(user?.username, receiver.username).id,
      sender_id: user?.username,
      msg_content: event.target.value.trim(),
      time_sent: currentDate,
    });
  }

  const sendMessage = async (setMessageInput) => {
    try {
      await Axios.post('message', messagePost);
      await messageReFetch();
      setMessageInput('');
    } catch (msg) {
      console.log(msg.response.data.errors);
    }
  }

  return (
    <>
      <ChatContext.Provider value={{
        getLatestMessage,
        findChat,
        initChat,
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
