import {createContext, useCallback, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceContext from "./InvoiceContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const ChatContext = createContext();
export const ChatProvider = ({children}) => {
  const {user} = useAuthContext();
  // const [chatCopy, setChatCopy] = useState([]);
  const {data: chats, refetch: chatReFetch, isLoading: chatLoading} = useQuery(['chat'], () => {
    return Axios.get('chat').then((res) => {
      // setChatCopy(res.data.data);
      return res.data.data;
    });
  })
  const {data: message, refetch: messageReFetch, isLoading: messageLoading} = useQuery(['message'], () => {
    return Axios.get('message').then((res) => res.data.data);
  });
  const [chatErrors, setChatErrors] = useState([]);
  const [messageImage, setMessageImage] = useState('')
  const [messagePost, setMessagePost] = useState({});

  const checkChatExist = (newChat) => {
    if (!chatLoading) {
      return chats.some((copy) => {
        return (copy.sender_id === newChat.sender_id && copy.receiver_id === newChat.receiver_id) || (copy.sender_id === newChat.receiver_id && copy.receiver_id === newChat.sender_id)
      })
    }
  };

  const getChat = (sender, receiver) => {
    return chats?.filter(chat => chat.sender_id === sender && chat.receiver_id === receiver || chat.sender_id === receiver && chat.receiver_id === sender);
  }

  const getLatestMessage = (sender, receiver) => {
    return getChat(sender, receiver)[0]?.messages[getChat(sender, receiver)[0].messages?.length -1];
  }

  const setSeen = (userMessage, receiver) => {
    if (userMessage?.length === 0) {
      return;
    }
    userMessage?.forEach(async (usrMsg) => {
      if (usrMsg.sender_id !== receiver) {
        usrMsg.is_read = 1;
        try {
          await Axios.patch(`message/${usrMsg.id}`, usrMsg).then(() => {
            messageReFetch();
          });
        } catch (e) {
          setChatErrors(e.response.data.errors)
          // console.log(e.response.data.errors);
        }
      }
    })
  };

  const initChat = async (sender, receiver) => {
    const newChat = {
      sender_id: sender,
      receiver_id: receiver,
    }
    if (!checkChatExist(newChat)) {
      console.log('init');
      try {
        await Axios.post('chat', newChat).then(async ({data}) => {
          chatReFetch()
        });
      } catch (msg) {
        setChatErrors(msg.response.data.errors)
        // console.log(msg.response.data.errors);
      }
    }
  };
  const findChat = (sender, receiver) => {
    if (!chats?.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)))) {
      chatReFetch()
      return Axios.get(`getChat/${sender}/${receiver}`).then(({data}) => data);
    }
    return chats?.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)));
  }

  const handleMessage = (event, setMessageInput) => {
    setMessageInput(event.target.value);
    setMessagePost({
      msg_content: event.target.value.trim(),
    });
  }

  const clearMessage = (setMessageInput) => {
    setMessageInput('');
    setMessagePost({});
    setMessageImage('');
  };

  const sendMessage = async (sender, receiver, setMessageInput) => {

    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    if (messageImage !== '' || messagePost.msg_content) {
      messagePost.image = messageImage;
      messagePost.receiver_id = receiver;
      // messagePost.chat_id = findChat(user?.username, receiver)?.id ?? await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.chat_id = getChat(user?.username, receiver)[0]?.id || await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.sender_id = user?.username;
      messagePost.time_sent = currentDate;
      messagePost.is_read = 0;
      setMessagePost({...messagePost});
      try {
        await Axios.post('message', messagePost, {
          headers: {'Content-Type': "multipart/form-data"}
        }).then(async () => {
          await messageReFetch();
          await chatReFetch()
          clearMessage(setMessageInput);
        });
      } catch (msg) {
        setChatErrors(msg.response.data.errors)
        // console.log(msg.response.data.errors);
      }
    }
  }
  const autoSendMessage = async (sender, receiver,msg) => {
    messagePost.msg_content = msg
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    if (messageImage !== '' || messagePost.msg_content) {
      messagePost.image = messageImage;
      messagePost.receiver_id = receiver;
      // messagePost.chat_id = findChat(user?.username, receiver)?.id ?? await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.chat_id = getChat(user?.username, receiver)[0]?.id || await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.sender_id = user?.username;
      messagePost.time_sent = currentDate;
      messagePost.is_read = 0;
      setMessagePost({...messagePost});
      try {
        await Axios.post('message', messagePost, {
          headers: {'Content-Type': "multipart/form-data"}
        }).then(async () => {
          await messageReFetch();
          await chatReFetch()
        });
      } catch (msg) {
        console.log(msg)
      }
    }
  }

  return (
    <>
      <ChatContext.Provider value={{
        getChat,
        chatErrors,
        setChatErrors,
        clearMessage,
        messageImage,
        checkChatExist,
        setSeen,
        getLatestMessage,
        findChat,
        initChat,
        chats,
        handleMessage,
        chatReFetch,
        sendMessage,
        message,
        messageReFetch,
        setMessageImage,
        setMessagePost,
        autoSendMessage,
      }}>
        {children}
      </ChatContext.Provider>
    </>
  );
};
export default ChatContext;
