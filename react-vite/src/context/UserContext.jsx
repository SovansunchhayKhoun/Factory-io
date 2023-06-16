import {createContext, useState, useEffect} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";


Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [user, setUser] = useState({});
  const [admin,setAdmin] = useState({});
  const [addresses,setAddresses] = useState([]);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    username:"",
    address: "",
    password:"",
    new_password:"",
    password_confirmation:"",
  })
  const [errors, setErrors] = useState({})

  const getAdmin = async () => {
    setIsLoading(true)
    const apiItems = await Axios.get("getAdmin");
    setAdmin(apiItems.data.data[0])
    setAdminForm(apiItems.data.data[0])
    setIsLoading(false)
  }
  const {data: usersQuery, refetch: usersQueryReFetch} = useQuery(['users'], () => {
    return Axios.get('users').then(res => {
      setUsers(res.data.data);
      return res.data.data;
    })
  })



  const getUserAddresses = async (id) => {
    await Axios.get(`userAddress/${id}`).then(({data}) => {
      setAddresses(data.data)
    }).catch((e) => {
      console.log(e);
    })
  }

  const getUser = async (id) => {
    await Axios.get(`users/${id}`).then(({data}) => {
      setUser(data.data)
      setUserToFormValues(data.data)
    }).catch((e) => {
      console.log(e);
    })
  }

  const getUsers = async () => {
    const apiItems = await Axios.get("users");
    setUsers(apiItems.data.data);
  };

  const storeUser = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("users", formValues)
      location.reload()
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }
    }
  }
  const onChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const setUserToFormValues = (user) => {
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username:user.username,
      address: user.address
    })
    setUser(user)
  }

  const setAdminForm = (admin) => {
    setFormValues({
      firstName: admin.firstName,
      lastName: admin.lastName,
      gender: admin.gender,
      phoneNumber: admin.phoneNumber,
      email: admin.email,
      username:admin.username,
      address: admin.address
    })
  }

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      await Axios.put("users/" + user.id, formValues)
      resetFormValues()
      history.back()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }
  const updateAdmin = async (e,adminID) => {
    e.preventDefault()
    try {
      await Axios.put("updateAdmin/" + adminID, formValues)
      resetFormValues()
      location.reload()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }

  const resetFormValues = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      email: "",
      username:"",
      password:"",
      new_password: "",
      address: "",
      password_confirmation:"",
    })
  }

  const updatePassword = async (e) => {
    e.preventDefault()
    try {
      await Axios.put("users/" + user.id + "/change-password", formValues)
      resetFormValues()
      setErrors({})
      history.back()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }
  const changeAdminPassword = async (e,adminID) => {
    e.preventDefault()
      console.log(formValues)
    try {
      await Axios.put("admins/" + adminID + "/change-password", formValues)
      resetFormValues()
      setErrors({})
      history.back()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }

  return <UserContext.Provider
    value={{
      usersQuery,
      usersQueryReFetch,
      users,
      user,
      formValues,
      setFormValues,
      setErrors,
      errors,
      storeUser,
      getUsers,
      getUser,
      onChange,
      updateUser,
      updatePassword,
      getAdmin,
      admin,
      setUserToFormValues,
      isLoading,
      getUserAddresses,
      addresses,
      setAddresses,
      resetFormValues,
      updateAdmin,
      changeAdminPassword,
    }}>{children}</UserContext.Provider>;
};

export default UserContext;
