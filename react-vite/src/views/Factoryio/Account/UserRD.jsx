import {useProjectContext} from "../../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import {ProjectCard} from "../../../components/FactoryComponent/ProjectCard.jsx";
import React, {useState} from "react";
import {UploadProjectForm} from "../../../components/FactoryComponent/UploadProjectForm.jsx";
import AdminPopUp from "../../../components/Modals/AdminPopUp.jsx";
import {UploadPrjBtn} from "../../../components/FactoryComponent/UploadPrjBtn.jsx";

export const UserRD = () => {
  const {projects} = useProjectContext()
  const {user} = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="flex flex-col gap-6 px-6 py-4">
      <section className="flex justify-end">
        <UploadPrjBtn modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </section>
      <section className="grid grid-cols-2 auto-cols-fr gap-8">
        {projects?.filter(project => project.user.id === user.id).map(project => <ProjectCard key={project?.id} project={project}/>)}
      </section>
    </main>
  );
};
