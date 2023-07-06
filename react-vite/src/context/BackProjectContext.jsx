import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import ChatContext from "./ChatContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const BackProjectContext = createContext();
export const BackProjectProvider = ({children}) => {
  const [backProjectFunding,setBackProjectFunding] = useState([])
  const [image,setImage] = useState('')
  const [comment,setComment] = useState('')
  const [totalAmount,setTotalAmount] = useState(0)
  const [qty,setQty] = useState(1)
  const [errors,setErrors] = useState({})
  const [response,setResponse] = useState({})
  const [currentItem,setCurrentItem] = useState({})
  const {user} = useAuthContext()
  const [isHidden,setIsHidden] = useState(false)
  const {
    autoSendMessage,
  } = useContext(ChatContext);

  const resetInput = () => {
    setTotalAmount(0)
    setQty(1)
    setImage('')
    setComment('')
    setErrors({})
    setIsHidden(false)
  }

  const {data: backProjectQuery, refetch: backProjectQueryReFetch, isLoading: backProjectsLoading} = useQuery(['backProjectQuery'], () => {
      return Axios.get(`backProjects`).then((res) => {
        setBackProjectFunding(res.data.data);
        return res.data.data
      });
    }
  );

  const storeBackProjectFunding = async (project) => {
    setResponse({})
    await Axios.post('backProjects',{
      funder_id: user?.id,
      project_id: project?.id,
      prototype_id:currentItem?.id,
      qty:qty,
      amount: totalAmount,
      image: image,
      comment:comment
    },{
      headers: {'Content-Type': "multipart/form-data"}
    }).then(async (res) => {
      setResponse(res)
      await autoSendMessage(user?.username, 'admin',`Hi, I would like to back this project.
       Project ID: ${project?.id},
       Project Name: ${project?.name},
       Prototype ID: ${currentItem?.id},
       Prototype Description: ${currentItem?.description},
       Price: ${currentItem?.price},
       Qty: ${qty},
       Total price: $ ${totalAmount}`)
      await backProjectQueryReFetch()
      resetInput()
    }).catch((err) =>{
      console.log(err)
      if(err.response.status === 422){
        setErrors(err.response.data.errors)
      }
    })
  }


  return <BackProjectContext.Provider value={{
    setImage,
    image,
    comment,
    setComment,
    errors,
    setErrors,
    response,
    setResponse,
    totalAmount,
    setTotalAmount,
    qty,
    setQty,
    currentItem,
    setCurrentItem,
    storeBackProjectFunding,
    isHidden,
    setIsHidden
  }}>
    {children}</BackProjectContext.Provider>;
};

export default BackProjectContext;
