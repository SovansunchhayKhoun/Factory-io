import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";
import axiosClient from "../../axios-client.js";
import {useProjectProtoContext} from "./ProjectProtoContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const ProjectContext = ({children}) => {
  // fetch project
  const {data: projects, refetch: projectsReFetch, isLoading: projectsIsLoading} = useQuery(['projects'], () => {
    return Axios.get('projects').then(({data}) => data.data);
  })
  const {postPrototype} = useProjectProtoContext();

  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState([]);
  const [file, setFile] = useState({});
  const [projectValues, setProjectValues] = useState({
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
    console.log(event.target.files)
    setPicture(event.target.files)

    // // check if input is image
    // if (event.target.attributes.accept.value.slice(0, 5) === event.target.files[0]?.type.slice(0, 5)) {
    //   setPicture(event.target.files[0]);
    //   setProjectValues({...projectValues, image: event.target.files[0]})
    // } else {
    //   setPicture('');
    // }
  }
  const handleFile = (event) => {
    if(event.length > 0) {
      setFile(event[0].file);
    } else {
      setFile(null)
    }
  }
  const clearProjectValues = () => {
    setErrors(null);
    setProjectValues({
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
    setFile(null);
  }
  const [isPosting, setIsPosting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const postProject = async (setModalOpen, user) => {
    setIsPosting(true);
    setErrors(null);
    projectValues.user_id = user.id;
    console.log(picture)
    const projectAssets = {
      image: picture,
      file: file,
    }
    projectValues.image = picture;
    projectValues.file = file;

    try {
      await Axios.post('projects', projectValues, {
        headers: {"Content-type": "multipart/form-data"}
      }).then(async ({data}) => {
        projectAssets.project_id = data?.id;
        await Axios.post('project_assets', projectAssets, {
          headers: {"Content-type": "multipart/form-data"}
        }).then(async () => {
          await postPrototype(projectAssets.project_id);
        }).then(() => {
          setIsPosting(false)
          projectsReFetch();
          clearProjectValues();
          setModalOpen(false);
          setToastOpen(true);
        })
      })
    } catch (e) {
      setErrors(e.response.data.errors)
      setIsPosting(false)
    }

    // stop loading if posting
    setIsPosting(false);
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
        projectsIsLoading,
        setIsPosting,
        isPosting,
        setToastOpen,
        toastOpen,
      }}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useProjectContext = () => useContext(StateContext);
