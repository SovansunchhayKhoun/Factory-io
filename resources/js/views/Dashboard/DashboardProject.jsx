import React from "react"
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {DashboardProjectCard} from "../../components/AdminComponents/DashboardProjectCard.jsx";
export const DashboardProject = () => {
  const {projects} = useProjectContext();

    return (
        <main className={"p-4"}>
          {projects?.map(project => {
            return (
              <DashboardProjectCard key={project?.id} project={project}/>
            )
          })}
        </main>
    );
};
