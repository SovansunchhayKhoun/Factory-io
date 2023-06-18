import {createContext, useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const StateContext = createContext();
export const ProjectProtoContext = ({children}) => {

  const {data: projectPrototypes} = useQuery(['projectProtos'], () => {
    return Axios.get('project_prototypes').then(({data}) => data)
  })
  const [picture, setPicture] = useState('');

  const handlePicture = (event) => {
    setPicture(event.target.files[0])
  }

  return (
    <StateContext.Provider value={{
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
