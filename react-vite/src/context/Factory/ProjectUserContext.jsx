import {createContext, useContext} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const ProjectUserContext = ({children}) => {
  // fetch project_users
  const {
    data: projectUsers,
    refetch: projectUsersReFetch,
    isLoading: projectUsersIsLoading
  } = useQuery(['projectUsers'], () => {
    return Axios.get('project_users').then(({data}) => data.data);
  })

  return (
    <>
      <StateContext.Provider value={{
        projectUsers,
        projectUsersIsLoading,
        projectUsersReFetch
      }}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useProjectUserContext = () => useContext(StateContext);
