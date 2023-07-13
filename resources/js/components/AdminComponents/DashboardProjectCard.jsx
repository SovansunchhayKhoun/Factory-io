import React, {useState} from "react"
import {Carousel, Spinner} from "flowbite-react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";
import {ImageExpand} from "../../components/ImageExpand.jsx";
import {ProjectComment} from "../../components/FactoryComponent/ProjectComment.jsx";
import {ProjectStar} from "../../components/FactoryComponent/ProjectStar.jsx";
import {ProjectSave} from "../../components/FactoryComponent/ProjectSave.jsx";
import {PiWarningLight} from "react-icons/pi"
import {Link} from "react-router-dom";

const imgUrl = import.meta.env.VITE_APP_URL;
export const DashboardProjectCard = ({project}) => {
  const {projectImages} = project;
  const [modalOpen, setModalOpen] = useState(false);
  const [expandImg, setExpandImg] = useState(false);
  const [curExp, setCurExp] = useState('');

  return (
    <div className={"flex gap-4"}>
      <section className={"max-w-[400px]"}>
        <Carousel>
          {projectImages?.map(proj => {
            return (
              <div className={"flex justify-center relative border"} key={proj?.id}>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setExpandImg(true)
                  setCurExp(proj?.image)
                }}>
                  <img className={"w-96 aspect-video object-contain"} src={`${imgUrl}/projects/${proj?.image}`} alt=""/>
                </button>
                <ImageExpand imgSrc={`${imgUrl}/projects/${curExp}`} setOpen={setExpandImg} open={expandImg}/>
              </div>
            )
          })}
        </Carousel>
      </section>
      <section>
        <p>Name: {project?.name}</p>
        <p>Description: {project?.description}</p>
        <p>Target Fund: {project?.target_fund}</p>
        <p>Deadline: {project?.project_deadline.slice(0, 10)}</p>
        <p>Like count: {project?.like_count}</p>
        <p>Comment count: {project?.comment_count}</p>
        <p>Save count: {project?.save_count}</p>
        <div className={"flex gap-4"}>
          <ProjectStar project={project}/>
          <ProjectComment project={project}/>
          <ProjectSave project={project}/>
        </div>
      </section>
      <section className={"flex"}>
        <button className={"p-4 bg-redBase text-whiteFactory"} onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true)
        }}>Delete
        </button>
        <Link to={`/project/${project?.id}`} className={"p-4 flex justify-center items-center bg-blueBase text-whiteFactory"} onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true)
        }}>
          View Info
        </Link>
      </section>
      <AdminPopUp content={<DeleteModal project={project} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
                  modalOpen={modalOpen} setModalOpen={setModalOpen} id={"delete-project-modal"}/>
    </div>
  );
};

const DeleteModal = ({setModalOpen, project}) => {
  const {deleteProject, isPosting} = useProjectContext();
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <div className={"p-4 bg-whiteFactory flex flex-col w-[20%] rounded-md"}>
          <section className={"flex justify-center items-center"}>
            <PiWarningLight className={"text-redBase w-8 h-8"}/> <span> Are you sure to delete this project?</span>
          </section>
          <section className={"mt-auto flex justify-center gap-4"}>
            <button disabled={isPosting || false} onClick={(e) => {
              e.stopPropagation();
              deleteProject(project);
            }}
                    className={`${isPosting ? 'bg-opacity-60' : 'bg-redBase hover:bg-redHover'} transition duration-200 px-4 py-1 text-whiteFactory rounded-md`}>
              Confirm {isPosting && <Spinner color={"purple"} size={"md"}/>}
            </button>
            <button disabled={isPosting || false} onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
                    className={`${isPosting ? 'bg-opacity-60' : 'bg-blueActive hover:bg-blueHover'} transition duration-200 px-4 py-1 text-whiteFactory rounded-md`}>
              Cancel
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
