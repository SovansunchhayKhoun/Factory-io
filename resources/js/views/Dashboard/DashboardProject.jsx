import React from "react"
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {DashboardProjectCard} from "../../components/AdminComponents/DashboardProjectCard.jsx";

export const DashboardProject = () => {
  const {projects} = useProjectContext();

  return (
    <main className={"p-4"}>
      {projects?.length === 0 && <div>No projects have been posted</div>}
      <div className={"grid grid-cols-1 gap-4"}>
        {projects?.map(project => {
          return (
            <DashboardProjectCard key={project?.id} project={project}/>
          )
        })}
      </div>
    </main>
  );
};
