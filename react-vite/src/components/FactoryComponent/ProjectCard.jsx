import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {Carousel, Spinner} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {ProjectStar} from "./ProjectStar.jsx";
import {ProjectSave} from "./ProjectSave.jsx";
import {ProjectComment} from "./ProjectComment.jsx";

const imgUrl = `http://127.0.0.1:8000/projects`
export const ProjectCard = ({project}) => {
  const {id, name, projectImages} = project;
  const {username} = project.user;

  return (
    <>
      <div className="max-w-[400px] flex flex-col bg-whiteFactory shadow-blueHover shadow-md rounded-md">
        <div className="justify-center flex-1 text-sm px-4 py-3 flex flex-col gap-2">
          <div className="bg-[#D9D9D9] flex justify-center shadow-blueActive shadow-sm rounded-md">
            <Carousel>
              {projectImages?.map((projectImage) => {
                return (
                  <img key={projectImage?.id} loading="lazy" className="relative w-fit object-contain max-h-[270px]"
                       src={`${imgUrl}/${projectImage?.image}`} alt=""/>
                )
              })}
            </Carousel>

          </div>
          <Link to={`/project/${id}`}>
            <span className="font-semibold overflow-hidden text-ellipsis">
              {name}
            </span>
            <div className="text-grayFactory">
              {username}
            </div>
          </Link>
        </div>

        {/*comment part*/}
        <div
          className={"border-t-2 border-grayFactory mt-auto px-4 pt-2 pb-3 flex items-center gap-x-3 justify-between"}>
          <ProjectStar project={project}/>
          <ProjectComment/>
          <ProjectSave project={project}/>
        </div>
      </div>
    </>
  );
};
