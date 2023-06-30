import {createContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const DonateContext = createContext();
export const DonateProvider = ({children}) => {
  const [donations,setDonations] = useState([])
  const [image,setImage] = useState('')
  const [comment,setComment] = useState('')
  const [amount,setAmount] = useState('')
  const [errors,setErrors] = useState({})
  const [response,setResponse] = useState({})
  const {user} = useAuthContext()

  const {data: donationsQuery, refetch: donationsQueryReFetch, isLoading: donationLoading} = useQuery(['donationsQuery'], () => {
      return Axios.get(`donations`).then((res) => {
        setDonations(res.data.data);
        return res.data.data
      });
    }
  );

  const resetInput = () => {
    setAmount('')
    setImage('')
    setComment('')
    setErrors({})
  }

  const storeDonation = async () => {
    await Axios.post('donations',{
      user_id: user.id,
      amount: amount,
      image: image,
      comment:comment
    },{
      headers: {'Content-Type': "multipart/form-data"}
    }).then((res) => {
      setResponse(res)
      donationsQueryReFetch()
      resetInput()
    }).catch((err) =>{
      if(err.response.status === 422){
        setErrors(err.response.data.errors)
      }
    })
  }

  return <DonateContext.Provider value={{
    donations,
    donationsQuery,
    donationsQueryReFetch,
    donationLoading,
    storeDonation,
    setImage,
    image,
    comment,
    setComment,
    amount,
    setAmount,
    resetInput,
    errors,
    setErrors,
    response,
    setResponse
  }}>
    {children}</DonateContext.Provider>;
};

export default DonateContext;
