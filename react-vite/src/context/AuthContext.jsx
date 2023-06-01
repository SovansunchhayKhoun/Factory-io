import {createContext, useContext, useEffect, useState} from "react";
import AxiosClient from "../axios-client.js";
import {redirect, useNavigate} from "react-router-dom";
import CartContext from "./CartContext.jsx";
import Axios from "axios";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {
  },
  setToken: () => {
  }
})

export const AuthContext = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const [isLoading,setIsLoading] = useState(false)
  const onLogout = (event) => {
    event.preventDefault();
    setIsLoading(true)
    localStorage.removeItem('CART_ITEM');
    try {
      AxiosClient.post('/logout').then(() => {
        setUser({})
        setToken(null)
        setIsLoading(false)
      })
    }catch (e){
      setIsLoading(false)
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      onLogout,
      isLoading,
      setIsLoading
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useAuthContext = () => useContext(StateContext)
