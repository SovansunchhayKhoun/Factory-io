import React from "react";
import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import ChatContext from "./ChatContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL+"/api/v1/";
const FundingContext = createContext();
export const FundingProvider = ({children}) => {
  const [fundings,setFundings] = useState([])
  const [section, setSection] = useState('fp')
  const [image,setImage] = useState('')
  const [comment,setComment] = useState('')
  const [amount,setAmount] = useState('')
  const [errors,setErrors] = useState({})
  const [response,setResponse] = useState({})
  const {user} = useAuthContext()

  const {
    autoSendMessage,
  } = useContext(ChatContext);

  const {data: fundingsQuery, refetch: fundingsQueryReFetch, isLoading: fundingsLoading} = useQuery(['fundingsQuery'], () => {
      return Axios.get(`fundings`).then((res) => {
        setFundings(res.data.data);
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



  const storeFunding = async (project) => {
    await Axios.post('fundings',{
      funder_id: user?.id,
      project_id: project?.id,
      amount: amount,
      image: image,
      comment:comment
    },{
      headers: {'Content-Type': "multipart/form-data"}
    }).then(async (res) => {
      setResponse(res)
      await autoSendMessage(user?.username, 'admin',`Hi, I would like to fund this project.
       Project ID: ${project?.id},
       Project Name: ${project?.name},
       Created by: ${project?.user.username},
       Amount: $ ${amount}`)
      await fundingsQueryReFetch()
      resetInput()
    }).catch((err) =>{
      console.log(err)
      if(err.response.status === 422){
        setErrors(err.response.data.errors)
      }
    })
  }

  return <FundingContext.Provider value={{
    fundings,
    fundingsQueryReFetch,
    fundingsLoading,
    storeFunding,
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
    section,
    setSection
  }}>
    {children}</FundingContext.Provider>;
};

export default FundingContext;
