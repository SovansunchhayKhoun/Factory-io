import React from "react";
import {createContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL+"/api/v1/";
const DonateContext = createContext();
export const DonateProvider = ({children}) => {
  const [donations,setDonations] = useState([])
  const [image,setImage] = useState('')
  const [comment,setComment] = useState('')
  const [amount,setAmount] = useState('')
  const [errors,setErrors] = useState({})
  const [response,setResponse] = useState({})
  const [totalDonation,setTotalDonation] = useState('')
  const {user} = useAuthContext()

  const {data: donationsQuery, refetch: donationsQueryReFetch, isLoading: donationLoading} = useQuery(['donationsQuery'], () => {
      return Axios.get(`donations`).then((res) => {
        setDonations(res.data.data);
        return res.data.data
      });
    }
  );
  const {data: totalDonations, refetch: totalDonationsReFetch} = useQuery(['totalDonations'], () => {
      return Axios.get(`totalDonations`).then((res) => {
        setTotalDonation(res.data[0])
        return res.data[0].total
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
      totalDonationsReFetch();
      resetInput()
    }).catch((err) =>{
      if(err.response.status === 422){
        setErrors(err.response.data.errors)
      }
    })
  }
  const deleteDonation = async (id) => {
    await Axios.delete('donations/' + id).then(() => {
      donationsQueryReFetch()
      totalDonationsReFetch()
    }).catch((err) => {console.log(err)
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
    setResponse,
    totalDonations,
    totalDonation,
    totalDonationsReFetch,
    deleteDonation
  }}>
    {children}</DonateContext.Provider>;
};

export default DonateContext;
