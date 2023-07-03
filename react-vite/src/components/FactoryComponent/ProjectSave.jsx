import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import React from "react";

export const ProjectSave = ({project, iconWidth, iconHeight}) => {
  const {postSave} = useProjectContext();
  const {user} = useAuthContext()
    return (
        <>
          {/*save post icon*/}
          <button onClick={() => postSave(project)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A0000"
                 className={`w-${iconWidth || 6} h-${iconHeight || 6}`}>
              <path fill={`${project?.save_state?.filter(pro => pro.user_id === user?.id)[0]?.save_state === 1 && '#8A0000'}`} strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </>
    );
};
