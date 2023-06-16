import {useProjectContext} from "../../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import {ProjectCard} from "../../../components/FactoryComponent/ProjectCard.jsx";
import React, {useState} from "react";
import {UploadProjectForm} from "../../../components/FactoryComponent/UploadProjectForm.jsx";
import AdminPopUp from "../../../components/Modals/AdminPopUp.jsx";

export const UserRD = () => {
  const {projects} = useProjectContext()
  const {user} = useAuthContext();
  console.log(projects[0])
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="flex flex-col gap-6 px-6 py-4">
      <section className="flex justify-end">
        <button onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true);
        }} className="bg-[#699BF7] text-whiteFactory px-8 py-2 rounded-[20px] shadow-[#699BF7] shadow-lg">
          Upload Project
        </button>
        <AdminPopUp modalOpen={modalOpen} setModalOpen={setModalOpen} content={<UploadProjectForm setModalOpen={setModalOpen} modalOpen={modalOpen}/>}/>
      </section>
      <section className="grid grid-cols-2 auto-cols-fr gap-3">
        {projects?.filter(project => project.user.id === user.id).map(project => <ProjectCard project={project}/>)}
      </section>
    </main>
  );
};
