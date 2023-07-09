import {Slide} from "@mui/material";
import {FloatingUser} from "../FloatingUser.jsx";
import {Carousel} from "flowbite-react";
import React, {useContext, useState} from "react";
import {ImageExpand} from "../../ImageExpand.jsx";
import {FundProjectContent} from "../../../views/FundProjectContent.jsx";
import AdminPopUp from "../../Modals/AdminPopUp.jsx";
import BackProjectContext from "../../../context/BackProjectContext.jsx";
import ChatContext from "../../../context/ChatContext.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";


const imgUrl = import.meta.env.VITE_APP_URL+'/projects'
export const PVProjectTab = ({projectPrototypes,project,setSection}) => {
  if (projectPrototypes?.length === 0) {
    return <div>This project does not contain any prototypes</div>
  }
  const [modalOpen, setModalOpen] = useState(false);

  const [img, setImg] = useState('')
  const [expand, setExpand] = useState(false);
  const {setCurrentItem,setIsHidden,setTotalAmount} = useContext(BackProjectContext)
  const {initChat} = useContext(ChatContext);
  const {user} = useAuthContext();

  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 auto-rows-fr gap-4 w-full">
        {projectPrototypes?.sort((a, b) => b.id - a.id)?.map(projectPrototype => {
          const {id, description, price, project_prototype_assets, proto_name} = projectPrototype;
          return (
            <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
              <section
                className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                <div className={"self-start"}>
                  <Carousel>
                    {project_prototype_assets?.map(pro => {
                      const {image} = pro;
                      return (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          setExpand(!expand);
                          setImg(image);
                        }} key={pro.id}
                                className="relative flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                          <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                               src={`${imgUrl}/${image}`}
                               alt={`prototype-${id}`}/>
                        </button>
                      )
                    })}
                  </Carousel>
                  <ImageExpand open={expand} setOpen={setExpand} imgSrc={`${imgUrl}/${img}`}/>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col pb-8 border-b-2 border-grayFactory">
                    <p className='font-semibold text-lg text-blueActive'>${proto_name}</p>
                    <p className='font-semibold text-lg text-redBase'>${price}</p>
                    <div className="grid grid-cols-[1fr_4fr] w-full text-blackFactory">
                      <div>Description<span className={"mx-1 text-redBase"}>&#x2022;</span></div>
                      <div className="text-sm text-grayFactory overflow-auto break-words">{description}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      initChat('admin', user.username)
                      setCurrentItem(projectPrototype)
                      setTotalAmount(price)
                      setSection('bp')
                      setIsHidden(true)
                      setModalOpen(true)
                    }}
                    className={"w-fit text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this
                    project
                  </button>
                  <AdminPopUp content={<FundProjectContent project={project} projectPrototypes={projectPrototypes} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
                              modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                </div>
              </section>
            </Slide>
          )
        })}
      </section>
    </main>
  );
};
