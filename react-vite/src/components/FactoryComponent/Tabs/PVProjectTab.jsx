import {Slide} from "@mui/material";
import {FloatingUser} from "../FloatingUser.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";

const imgUrl = 'http://127.0.0.1:8000/projects/'
export const PVProjectTab = ({projectPrototypes}) => {
  if (projectPrototypes?.length === 0) {
    return <div>This project does not contain any prototypes</div>
  }

  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 auto-rows-fr gap-4 w-full">
        {projectPrototypes?.map(projectPrototype => {
          const {id, description, price, image} = projectPrototype;
          return (
            <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
              <section className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                <div className="flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                  <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                       src={`${imgUrl}/${image}`}
                       alt={`prototype-${id}`}/>
                </div>

                <div className=''>
                  <div className="flex flex-col text-lg">
                    <p className='font-semibold text-redBase'>{price}</p>
                    <p className="text-blackFactory">Description
                      <p>
                        {description}
                      </p>
                    </p>
                  </div>
                  <button className={"text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this project</button>
                </div>
              </section>
            </Slide>
          )
        })}
      </section>
    </main>
  );
};
