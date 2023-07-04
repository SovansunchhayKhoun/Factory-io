import {createContext, useContext} from "react";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const CommentContext = ({children}) => {
  return (
    <StateContext.Provider value={{}}>
      {children}
    </StateContext.Provider>
  );
};

export const useCommentContext = () => useContext(StateContext);
