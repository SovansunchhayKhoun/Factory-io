import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";
import axiosClient from "../../axios-client.js";

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
    image: "",
    file: "",
    name: "",
    proposal: "",
    description: "",
    category: "",
    project_deadline: "",
    target_fund: "",
    funder_count: 0,
    like_count: 0,
    comment_count: 0,
    saved_count: 0,
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
      image: "",
      file: "",
      name: "",
      proposal: "",
      category: "",
      description: "",
      project_deadline: "",
      target_fund: "",
      funder_count: 0,
      like_count: 0,
      comment_count: 0,
      saved_count: 0,
    });
    setPicture('');
    setFile('');
  }

  const postProject = async (setModalOpen, user) => {
    setErrors(null);
    projectValues.user_id = user.id;

    console.log(projectValues)

    try {
      // post to project table
      await Axios.post('projects', projectValues, {
        headers: {"Content-Type": "multipart/form-data"}
      }).then(async () => {
        await projectsReFetch();
        clearProjectValues();
        setModalOpen(false);
      });
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
