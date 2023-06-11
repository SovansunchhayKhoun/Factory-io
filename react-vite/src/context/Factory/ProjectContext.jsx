import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const ProjectContext = ({children}) => {
  // fetch project
  const {data: projects, refetch: projectsReFetch, isLoading: projectsIsLoading} = useQuery(['projects'], () => {
    return Axios.get('projects').then(({data}) => data.data);
  })
  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState('');
  const [file, setFile] = useState('');
  const [projectValues, setProjectValues] = useState({
    name: "",
    description: "",
    category: "",
    target_fund: "",
    project_deadline: "",
    rating: 0,
    funder_count: 0,
    image: "",
    file: "",
    // image: picture,
    // file: file,
  })

  const handlePicture = (event) => {
    // check if input is image
    if (event.target.attributes.accept.value.slice(0, 5) === event.target.files[0].type.slice(0, 5)) {
      setPicture(event.target.files[0]);
      setProjectValues({...projectValues, image: event.target.files[0]})
    }
  }
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setProjectValues({...projectValues, file: event.target.files[0]})
  }
  const clearProjectValues = () => {
    setErrors(null);
    setProjectValues({
      name: "",
      description: "",
      category: "",
      project_deadline: "",
      target_fund: "",
      image: "",
      file: "",
    });
    setPicture('');
    setFile('');
  }

  const postProject = async (setModalOpen, user) => {
    setErrors(null);
    try {
      // post to project table
      await Axios.post('projects', projectValues, {
        headers: {"Content-Type": "multipart/form-data"}
      }).then(async () => {
        // then get that posted project
        await Axios.get('last_project').then(async ({data}) => {
          const project_user = {
            project_id: data.id,
            user_id: user?.id
          }
          // then post to pivot table (project_users)
          try {
            await Axios.post('project_users', project_user).then(() => {
              clearProjectValues();
              projectsReFetch();
              setModalOpen(false);
            })
          } catch (e) {
            console.log(e);
          }
        });
      })
    } catch (e) {
      setErrors(e.response.data.errors);
      console.log(e.response.data.errors);
    }
  }
  return (
    <>
      <StateContext.Provider value={{
        setErrors,
        errors,
        postProject,
        projectValues,
        setProjectValues,
        setPicture,
        picture,
        file,
        setFile,
        handleFile,
        handlePicture,
        projects,
        projectsReFetch,
        projectsIsLoading
      }}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useProjectContext = () => useContext(StateContext);
