import React, {useState} from "react"
import {Carousel} from "flowbite-react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const DashboardProjectCard = ({project}) => {
  const {projectImages} = project;
  const {deleteProject} = useProjectContext();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={"flex"}>
      <div className={"flex-1"}>
        <Carousel>
          {projectImages?.map(proj => {
            return (
              <div className={"flex justify-center relative border"} key={proj?.id}>
                <img className={"w-96 aspect-video object-contain"} src={`${imgUrl}/projects/${proj?.image}`} alt=""/>
              </div>
            )
          })}
        </Carousel>
      </div>
      <div className={"flex-1"}>{project?.name}</div>
      <button className={"p-4 bg-redBase text-whiteFactory"} onClick={(e) => {
        e.stopPropagation();
        setModalOpen(true)
      }}>Delete</button>
      <AdminPopUp content={<DeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>} modalOpen={modalOpen} setModalOpen={setModalOpen} id={"delete-project-modal"}/>
    </div>
  );
};

const DeleteModal = ({setModalOpen, modalOpen}) => {
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <div className={"flex justify-center items-center"}>
        <div className={"bg-whiteFactory w-[70%] h-[70%]"}>
          <section className={"flex justify-between "}>
            <div>
              Delete Modal
            </div>
            <button onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}>
              Close
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
