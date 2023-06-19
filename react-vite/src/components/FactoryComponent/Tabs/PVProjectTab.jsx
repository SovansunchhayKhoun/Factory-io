import {Slide} from "@mui/material";
import {FloatingUser} from "../FloatingUser.jsx";
import {useAuthContext} from "../../../context/AuthContext.jsx";

const imgUrl = 'http://127.0.0.1:8000/projects/'
export const PVProjectTab = ({projectPrototypes}) => {
  if (projectPrototypes?.length === 0) {
    return <div>This project does not contain any prototypes</div>
  }

  return (
    <main className='grid grid-cols-1 auto-cols-fr gap-4'>
      {projectPrototypes?.map(projectPrototype => {
        const {id, description, price, image} = projectPrototype;
        return (
          <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
            <section
              className='flex justify-between w-fit items-start p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md gap-12'>
              <div className='rounded-md flex-1'>
                <img className="object-contain rounded-md" loading={"lazy"} src={`${imgUrl}/${image}`} alt={`protoype-${id}`}/>
              </div>

              <div className='flex-1'>
                <div className="flex flex-col text-lg">
                  <p className='font-semibold text-redBase'>{price}</p>
                  <p className="text-blackFactory">{description}</p>
                </div>
                <button className={"text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this project</button>
              </div>
            </section>
          </Slide>
        )
      })}
    </main>
  );
};
