import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {Carousel, Spinner} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {ProjectStar} from "./ProjectStar.jsx";
import {ProjectSave} from "./ProjectSave.jsx";
import {ProjectComment} from "./ProjectComment.jsx";

const imgUrl = import.meta.env.VITE_APP_URL+`/projects`
export const ProjectCard = ({project}) => {
  const {id, name, projectImages} = project;
  const {username} = project?.user;
  const {setModalOpen, setSearchInput} = useProjectContext()

  return (
    <>
      <div className="max-w-[400px] flex flex-col bg-whiteFactory shadow-blueHover shadow-md rounded-md">
        <div className="justify-center flex-1 text-sm px-4 py-3 flex flex-col gap-2">
          <div className="flex h-full justify-center shadow-md rounded-md">
            <Carousel indicators={false}>
              {projectImages?.map((projectImage) => {
                return (
                  <img key={projectImage?.id} loading="lazy" className="transition ease-linear duration-200 hover:scale-125 relative w-fit object-contain max-h-[270px]"
                       src={`${imgUrl}/${projectImage?.image}`} alt=""/>
                )
              })}
            </Carousel>

          </div>
        </div>

        {/*comment part*/}
        <div
          className={"px-4 text-sm flex flex-col gap-3"}>
          <Link onClick={() => {
            setModalOpen(false)
            setSearchInput('')
          }} to={`/project/${id}`}>
            <span className="font-semibold overflow-hidden text-ellipsis">
              {name}
            </span>
            <div className="text-grayFactory">
              {username}
            </div>
          </Link>
          <div className={"border-t-2 border-grayFactory mt-auto pt-2 pb-3 flex items-center gap-x-3 justify-between"}>
            <ProjectStar project={project}/>
            <ProjectComment project={project}/>
            <ProjectSave project={project}/>
          </div>
        </div>
      </div>
    </>
  );
};
