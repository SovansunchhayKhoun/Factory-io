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
              // const {name, id, user, description, projectImages} = project_resource[0];
              return (
                <ProjectCard project={project_resource[0]}/>
                // <div key={pro?.id}>
                //   <div className="flex justify-center w-full">
                //     <div className="flex gap-12 justify-center">
                //       <div className="flex flex-col w-[90%] items-start gap-3">
                //         <div className="flex justify-center items-center text-sm gap-2">
                //           <img className="w-[48px] h-[48px] border border-blueActive rounded-[50%]"
                //                src={`https://robohash.org/${user?.username}`} alt=""/>
                //           <span className="font-semibold">{user?.username}</span>
                //         </div>
                //         <div className="w-full grid grid-cols-[1fr_2fr] gap-6">
                //           <Carousel>
                //             {projectImages?.map((pic, key) => {
                //               return (
                //                 <div key={key} className="relative bg-grayFactory flex justify-center w-fit">
                //                   <img src={`${imgUrl}/${pic.image}`} className="h-[200px] object-contain" alt=""/>
                //                 </div>
                //               )
                //             })}
                //           </Carousel>
                //           <Link to={`/project/${id}`} className="h-fit w-fit">
                //             <div>{name}</div>
                //             <div>{description}</div>
                //           </Link>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                //   <div className={"flex justify-center"}>
                //     <hr className="mt-12 rounded-3xl w-3/4 border border-blackFactory"/>
                //   </div>
                // </div>
              )
            })}
          </section>
        </div>
      </div>
    </main>
  );
};
