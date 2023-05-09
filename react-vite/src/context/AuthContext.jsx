import {createContext, useContext, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";

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
    AxiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
      localStorage.removeItem('USER_CREDENTIALS')
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
