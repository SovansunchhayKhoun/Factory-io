import {createContext, useContext} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const CommentContext = ({children}) => {
  const {data: comments, isLoading:commentsIsLoading, refetch: commentsReFetch} = useQuery(['comments'], () => {
    return Axios.get('comments').then(({data}) => data.data);
  })
  return (
    <StateContext.Provider value={{
      comments,
      commentsIsLoading,
      commentsReFetch
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useCommentContext = () => useContext(StateContext);
