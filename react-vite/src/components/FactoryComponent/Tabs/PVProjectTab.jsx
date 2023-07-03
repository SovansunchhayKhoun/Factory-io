import {Slide} from "@mui/material";
import {FloatingUser} from "../FloatingUser.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";
import {Carousel} from "flowbite-react";
import {useState} from "react";
import {ImageExpand} from "../../ImageExpand.jsx";

const imgUrl = 'http://127.0.0.1:8000/projects'
export const PVProjectTab = ({projectPrototypes}) => {
  if (projectPrototypes?.length === 0) {
    return <div>This project does not contain any prototypes</div>
  }

  const [img, setImg] = useState('')
  const [expand, setExpand] = useState(false);

  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 auto-rows-fr gap-4 w-full">
        {projectPrototypes?.map(projectPrototype => {
          const {id, description, price, project_prototype_assets} = projectPrototype;
          return (
            <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
              <section
                className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                <Carousel>
                  {project_prototype_assets?.map(pro => {
                    const {image} = pro;
                    return (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setExpand(!expand);
                        setImg(image);
                      }} key={pro.id}
                              className="relative flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                        <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                             src={`${imgUrl}/${image}`}
                             alt={`prototype-${id}`}/>
                      </button>
                    )
                  })}
                </Carousel>
                <ImageExpand open={expand} setOpen={setExpand} imgSrc={`${imgUrl}/${img}`}/>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col">
                    <p className='font-semibold text-lg text-redBase'>${price}</p>
                    <div className="text-blackFactory">Description <p className="">{description}</p></div>
                  </div>
                  <button className={"w-fit text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this
                    project
                  </button>
                </div>
              </section>
            </Slide>
          )
        })}
      </section>
    </main>
  );
};
