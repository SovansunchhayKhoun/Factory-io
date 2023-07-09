import React from "react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const ProjectStar = ({project, iconWidth, iconHeight}) => {
  const {postLike} = useProjectContext();
  // const {like_count} = project;
  const {user} = useAuthContext()
  return (
    <>
      {/*star icon*/}
      <button onClick={() => {
        postLike(project);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F24E1E"
             className={`w-${iconWidth || 6} h-${iconHeight || 6}`}>
          <path
            fill={`${project?.like_state?.filter(pro => pro.user_id === user?.id)[0]?.like_state === 1 && '#F24E1E'}`}
            strokeLinecap="round" strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
        </svg>
        <span className="font-semibold text-sm">
              {project?.like_count}
            </span>
      </button>
    </>
  );
};
