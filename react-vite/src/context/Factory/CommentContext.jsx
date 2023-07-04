import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const CommentContext = ({children}) => {
  const {data: comments, isLoading:commentsIsLoading, refetch: commentsReFetch} = useQuery(['comments'], () => {
    return Axios.get('comments').then(({data}) => data.data);
  })
  const {user} = useAuthContext();
  const [commentInput, setCommentInput] = useState('');
  const [picture, setPicture] = useState(null);
  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  }
  const submitComment = async (project) => {
    const comment_time = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-') + ' ' + new Date().toTimeString().slice(0, 8);

    if(commentInput || picture) {
      await Axios.post('comments', {
        project_id: project.id,
        user_id: user?.id,
        comment_time: comment_time,
        body: commentInput,
        image: picture,
      }, {headers: {"Content-type" : "multipart/form-data"}}).then(({data}) => {
        commentsReFetch()
        setCommentInput('')
        console.log(data)
      })
    }
  }

  const replyComment = async (cmt, project, setReplyOpen) => {
    console.log(cmt)
    console.log(project)
    const comment_time = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-') + ' ' + new Date().toTimeString().slice(0, 8);
    if(commentInput || picture) {
      await Axios.post ('comments', {
        user_id: user?.id,
        project_id: project?.id,
        parent_id: cmt?.id,
        body: commentInput,
        comment_time: comment_time,
        image: picture
      }, {headers: {"Content-type" : "multipart/form-data"}}).then(() => {
        commentsReFetch()
        setReplyOpen(false)
        setCommentInput('')
      })
    }
  }

  const handlePicture = (event) => {
    setPicture(event.target.files[0])
  }
  return (
    <StateContext.Provider value={{
      setPicture,
      picture,
      handlePicture,
      replyComment,
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
