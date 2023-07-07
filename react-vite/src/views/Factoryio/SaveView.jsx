import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import {Carousel} from "flowbite-react";
import {ProjectSave} from "../../components/FactoryComponent/ProjectSave.jsx";
import {Slide} from "@mui/material";
import {ProjectCard} from "../../components/FactoryComponent/ProjectCard.jsx";

const imgUrl = 'http://127.0.0.1:8000/projects'
export const SaveView = ({openSave, setOpenSave}) => {
  const {projectSaves} = useProjectContext();
  const {user} = useAuthContext();
  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-[70%] h-[70%] flex flex-col bg-white rounded-md">
          <section className="flex justify-between items-center p-4 border-b-2 border-blueActive">
            <div className="flex items-center gap-2">
              <img src={`https://robohash.org/${user?.username}`}
                   className="w-[48px] h-[48px] border border-blueActive rounded-[50%]" alt=""/>
              <span className={"font-semibold text-sm"}>{user?.username}</span>
            </div>
            <button onClick={(event) => {
              event.stopPropagation()
              setOpenSave(false)
            }} className="transition duration-500 hover:bg-[#D9D9D9] rounded-[20px] px-6 py-1.5 h-fit">
              Close
            </button>
          </section>
          <section className="grid grid-cols-3 overflow-auto gap-12 p-4">
            {projectSaves?.filter(pro => pro.user_id === user?.id && pro.save_state === 1)?.length === 0 && (
              <div className="text-gray-600">
                No Saved Projects
              </div>
            )}
            {projectSaves?.filter(pro => pro.user_id === user?.id && pro.save_state === 1)?.map(pro => {
              const {project_resource} = pro;
              return (
                <ProjectCard key={pro?.id} project={project_resource[0]}/>
              )
            })}
          </section>
        </div>
      </div>
    </main>
  );
};
