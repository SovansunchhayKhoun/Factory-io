import {createContext, useContext, useEffect, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
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
  const onLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('CART_ITEM');
    // localStorage.removeItem('USER_CREDENTIALS')
    AxiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }
  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      onLogout,
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useAuthContext = () => useContext(StateContext)
