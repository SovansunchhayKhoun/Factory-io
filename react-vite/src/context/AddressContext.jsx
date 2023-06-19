import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext()

export const AddressContext = ({children}) => {
  const [userAddress, setUserAddress] = useState([]);
  const {data: addresses, refetch: addressesReFetch, isLoading: addressesIsLoading} = useQuery(['addresses'], () => {
    return Axios.get(`addresses`).then(({data}) => {
      return data.data;
    })
  })

  const [addressLoading, setAddressLoading] = useState(false);
  const getUserAddress = async (id) => {
    console.log(id)
      setAddressLoading(true);
      await Axios.get(`userAddress/2`).then(({data}) => {
        console.log(data)
        setUserAddress(data);
        setAddressLoading(false);
        return data.data
      });
  }

  const storeAddress = async (e) => {
    e.preventDefault()
    const addressInfo = new FormData();
    addressInfo.append('address', address)
    addressInfo.append('user_id', user.id)
    try {
      await Axios.post('addresses', addressInfo).then(() => {
        setAddress('')
        getUserAddress(user.id)
      })
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }
    }
  }

  const deleteAddress = (addressID) => {
    try {
      Axios.delete(`addresses/${addressID}`).then(() => getUserAddresses(user.id))
    } catch (e) {
      console.log(e)
    }
  }

  const editAddress = async (addressID) => {
    try {
      await Axios.put(`addresses/${addressID}`, {
        user_id: user.id,
        address: address
      }).then((res) => {
        console.log(res)
        // getUserAddress(user.id)
        // setAddress('')
        // setCurrentAddress({})
        // setEditBtn(!editBtn)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <StateContext.Provider value={{
      setAddressLoading,
      addressLoading,
      addresses,
      addressesReFetch,
      addressesIsLoading,
      userAddress,
      setUserAddress,
      getUserAddress,
      storeAddress,
      editAddress,
      deleteAddress,

    }}>
      {children}
    </StateContext.Provider>
  );

}

export const useAddressContext = () => useContext(StateContext)
