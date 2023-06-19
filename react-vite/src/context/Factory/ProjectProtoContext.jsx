import {createContext, useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const StateContext = createContext();
export const ProjectProtoContext = ({children}) => {
  const {data: projectPrototypes} = useQuery(['projectProtos'], () => {
    return Axios.get('project_prototypes').then(({data}) => data)
  })
  const [errors, setErrors] = useState([]);

  const [picture, setPicture] = useState('');
  const [prototypeList, setPrototypeList] = useState([]);
  const [prjPrototypeValues, setPrjPrototypeValues] = useState({
    price: "",
    description: ""
  });

  const handlePicture = (event) => {
    setPicture(event.target.files[0])
    prjPrototypeValues.image = event.target.files[0];
  }

  const clearPrototype = () => {
    setPrjPrototypeValues({
      price: "",
      description: ""
    })
    setPicture("");
  }

  const submitPrototype = (setOpen) => {
    if (!prjPrototypeValues.price || !prjPrototypeValues.description || !prjPrototypeValues.image) {
      setPrjPrototypeValues({...prjPrototypeValues, errorMsg: 'Please fill all missing fields'})
    } else {
      setPrototypeList([...prototypeList, prjPrototypeValues])
      clearPrototype();
      setOpen(false)
    }
  }

  const postPrototype = async (project_id) => {
    try {
      await prototypeList.forEach(prototype => {
        prototype.project_id = project_id;
        Axios.post('project_prototypes', prototype, {
          headers: {"Content-Type": "multipart/form-data"}
        })
      })
      clearPrototype();
    } catch (e) {
      setErrors(e.response.data.errors);
      console.log(e.response.data.errors);
    }
  }

  return (
    <StateContext.Provider value={{
      postPrototype,
      prototypeList,
      submitPrototype,
      prjPrototypeValues,
      setPrjPrototypeValues,
      handlePicture,
      projectPrototypes,
      picture,
      setPicture,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useProjectProtoContext = () => useContext(StateContext);
