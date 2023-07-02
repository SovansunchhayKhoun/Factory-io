import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";
import axiosClient from "../../axios-client.js";
import {useProjectProtoContext} from "./ProjectProtoContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const StateContext = createContext();
export const ProjectContext = ({children}) => {
  const {user} = useAuthContext();
  // fetch project
  const {data: projects, refetch: projectsReFetch, isLoading: projectsIsLoading} = useQuery(['projects'], () => {
    return Axios.get('projects').then(({data}) => data.data);
  })
  const {
    data: projectLikes,
    refetch: projectLikesReFetch,
    isLoading: projectLikesIsLoading
  } = useQuery(['projectLikes'], () => {
    return Axios.get('project_likes').then(({data}) => data.data);
  })
  const {
    data: projectSaves,
    refetch: projectSavesReFetch,
    isLoading: projectSavesIsLoading
  } = useQuery(['projectSaves'], () => {
    return Axios.get('saved_projects').then(({data}) => data.data);
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
    // console.log(event.target.files)
    setPicture([...event.target.files])

    // // check if input is image
    // if (event.target.attributes.accept.value.slice(0, 5) === event.target.files[0]?.type.slice(0, 5)) {
    //   setPicture(event.target.files[0]);
    //   setProjectValues({...projectValues, image: event.target.files[0]})
    // } else {
    //   setPicture('');
    // }
  }
  const handleFile = (event) => {
    if (event.length > 0) {
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
    setPicture([]);
    setFile(null);
  }
  const [isPosting, setIsPosting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const postProject = async (setModalOpen, user) => {
    setIsPosting(true);
    setErrors(null);
    projectValues.user_id = user.id;

    // to make sure that we have at least 1 image when we upload
    projectValues.image = picture[0];
    projectValues.file = file;

    try {
      await Axios.post('projects', projectValues, {
        headers: {"Content-type": "multipart/form-data"}
      }).then(async ({data}) => {
        const project_id = data?.id;
        await Axios.post('project_assets', {
          file: file,
          project_id: project_id
        }, {
          headers: {"Content-type": "multipart/form-data"}
        }).then(async () => {
          await Array.from(picture).forEach((pic) => {
            Axios.post('project_images', {
              image: pic,
              project_id: project_id
            }, {
              headers: {"Content-Type": "multipart/form-data"}
            })
          })
        }).then(async () => {
          await postPrototype(project_id);
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
  const postLike = async (project) => {
    await Axios.post('checkLike', {
      user_id: user?.id,
      project_id: project.id
    }).then(async ({data}) => {
      if (data) {
        await Axios.put(`project_likes/${data.id}`, {
          like_state: !data.like_state,
          user_id: user?.id,
          project_id: project.id
        })
      } else {
        await Axios.post('project_likes', {
          project_id: project.id,
          user_id: user?.id,
          like_state: 1
        })
      }
    }).then(() => {
      projectsReFetch();
    }).catch(e => console.log(e.response.data.errors))

    // await Axios.put(`project_likes/${project.id}`, {
    //   like_state: !likeState,
    //   user_id: user?.id,
    //   project_id: project.id
    // }).then(async () => {
    //   project.like_count = project.projectLikes.filter(p => p.like_state === 1)
    //     .forEach(p => console.log(p))
    //   console.log(project.like_count)
    //   await Axios.put(`projects/${project.id}`, project)
    // }).then(() => {
    //   projectsReFetch();
    // }).catch(e => console.log(e.response.data.errors))
  }

  const postSave = async (project) => {
    // console.log('saved')
    await Axios.post('checkUserSave', {
      project_id: project?.id,
      user_id: user?.id
    }).then(async ({data}) => {
      if (!data) {
        await Axios.post('saved_projects', {
          project_id: project?.id,
          user_id: user?.id,
          save_state: true,
        })
      } else {
        await Axios.put(`saved_projects/${data?.id}`, {...data, save_state: !data.save_state})
      }
    }).then(() => {
      projectsReFetch()
      projectSavesReFetch()
    }).catch(e => console.log(e.response.data.errors))
  }
  return (
    <>
      <StateContext.Provider value={{
        projectSaves,
        projectSavesReFetch,
        projectSavesIsLoading,
        postSave,
        projectLikes,
        postLike,
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
