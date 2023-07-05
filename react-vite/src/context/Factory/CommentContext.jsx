import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const CommentContext = ({children}) => {
  const {data: comments, isLoading: commentsIsLoading, refetch: commentsReFetch} = useQuery(['comments'], () => {
    return Axios.get('comments').then(({data}) => data.data);
  })
  const [cmtErrors, setCmtErrors] = useState([]);
  const {user} = useAuthContext();
  const [commentInput, setCommentInput] = useState('');
  const [picture, setPicture] = useState(null);
  const [replyOpen, setReplyOpen] = useState(0);
  const [row, setRow] = useState(1); // text area row
  const handleCommentInput = (event) => {
    if (event.target.value !== '\n' && event.target.value !== ' ')
      setCommentInput(event.target.value);
    setCmtErrors([])
  }
  const clearComment = () => {
    setCommentInput('');
    setPicture(null);
    setRow(1)
  }
  const reFetchAll = async () => {
    await commentsReFetch();
  }
  const submitComment = async (project, cmt) => {
    const comment_time = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-') + ' ' + new Date().toTimeString().slice(0, 8);

    console.log(commentInput)
    if (commentInput !== '' || picture) { // check whether we have at least a picture or message before submit
      await Axios.post('comments', {
        project_id: project.id,
        user_id: user?.id,
        comment_time: comment_time,
        body: commentInput,
        image: picture,
        parent_id: cmt?.id || null
      }, {headers: {"Content-type": "multipart/form-data"}}).then(({data}) => {
        reFetchAll();
        clearComment()
      }).catch(e => {
        setCmtErrors(e.response.data.errors)
        console.log(e.response.data.errors)
      })
    }
  }

  const handlePicture = (event) => {
    setCmtErrors([])
    setPicture(event.target.files[0])
  }
  return (
    <StateContext.Provider value={{
      row,
      setRow,
      cmtErrors,
      setCmtErrors,
      setReplyOpen,
      replyOpen,
      setPicture,
      picture,
      handlePicture,
      submitComment,
      comments,
      commentsIsLoading,
      commentsReFetch,
      handleCommentInput,
      setCommentInput,
      commentInput,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useCommentContext = () => useContext(StateContext);
