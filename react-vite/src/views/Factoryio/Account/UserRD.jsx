import {useProjectContext} from "../../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import {ProjectCard} from "../../../components/FactoryComponent/ProjectCard.jsx";
import {UploadPrjBtn} from "../../../components/FactoryComponent/UploadPrjBtn.jsx";

export const UserRD = () => {
  const {projects} = useProjectContext()
  const {user} = useAuthContext();
  console.log(projects[0])
  return (
    <main className="flex flex-col gap-6 px-6 py-4">
      <section className="flex justify-end">
        <UploadPrjBtn/>
      </section>
      <section className="grid grid-cols-2 auto-cols-fr gap-3">
        {projects?.filter(project => project.user.id === user.id).map(project => <ProjectCard project={project}/>)}
      </section>
    </main>
  );
};
