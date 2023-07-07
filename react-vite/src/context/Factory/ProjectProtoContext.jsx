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

  const [picture, setPicture] = useState([null]);
  const [prototypeList, setPrototypeList] = useState([]);
  const [prjPrototypeValues, setPrjPrototypeValues] = useState({
    price: "",
    description: ""
  });

  const handlePicture = (event) => {
    setPicture([...event.target.files])
    prjPrototypeValues.image = event.target.files;
    // if(event.target.files[0].type?.slice(0,5) === 'image') {
    // }
  }

  const clearPrototype = () => {
    setPrjPrototypeValues({
      price: "",
      description: "",
      proto_name: ""
    })
    setPicture(null);
  }

  const submitPrototype = (setOpen) => {
    if (!prjPrototypeValues.price || !prjPrototypeValues.description || !prjPrototypeValues.image) {
      setPrjPrototypeValues({...prjPrototypeValues, errorMsg: 'Please fill all missing fields'})
    } else {
      prjPrototypeValues.id = prototypeList.length + 1;
      prjPrototypeValues.proto_name = "Prototype - " + prjPrototypeValues.id;
      setPrototypeList([...prototypeList, prjPrototypeValues])
      clearPrototype();
      // console.log(prototypeList)
      setOpen(false)
    }
  }

  const postPrototype = async (project_id) => {
    try {
      await prototypeList.forEach((prototype, index) => {
        prototype.project_id = project_id;
        Axios.post('project_prototypes', {...prototype, image: prototype.image[0]}, {
          headers: {"Content-Type": "multipart/form-data"}
        }).then(async ({data}) => {
          Array.from(prototype?.image).forEach((pic) => {
            Axios.post('project_prototype_assets', {
              project_prototype_id: data?.id,
              image: pic,
            }, {headers: {"Content-Type": "multipart/form-data"}})
          })
        }).then(() => {
          setPrototypeList([]);
        })
      })
    } catch (e) {
      setErrors(e.response.data.errors);
      console.log(e.response.data.errors);
    }
  }

  return (
    <StateContext.Provider value={{
      postPrototype,
      prototypeList,
      setPrototypeList,
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
