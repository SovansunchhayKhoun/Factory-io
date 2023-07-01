import {FundProjectTab} from "./FundProjectTab.jsx";
import {BackProjectTab} from "./BackProjectTab.jsx";

export const FundProjectContent = ({setModalOpen, modalOpen,isHidden,setIsHidden,section,setSection,project,projectPrototypes}) => {
  return (
    <>
      <section className="p-4 text-blackFactory flex flex-col justify-center rounded-md bg-whiteFactory shadow-2xl min-w-[500px]">
        {section === 'bp' && <BackProjectTab project={project} projectPrototypes={projectPrototypes} setIsHidden={setIsHidden} setSection={setSection}/>}
        {section === 'fp' && <FundProjectTab project={project} setIsHidden={setIsHidden} setSection={setSection}/>}
        <div>
          <div className={`${isHidden && 'hidden'}`}>
            <button onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }} className="transition duration-200 rounded-[50%] hover:bg-blackFactory/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className={`${isHidden && 'hidden'} flex flex-col justify-center items-center gap-x-4 gap-y-8`}>
            <p>Do you want to get prototypes?</p>
            <div className="flex flex-row justify-between gap-x-12">
              <div onClick={(e) => {
                e.stopPropagation();
                setIsHidden(true)
                setSection('bp')
              }} className=" justify-center flex px-4 py-4 bg-redBase rounded-md cursor-pointer transition duration-200 hover:bg-redHover w-full items-center">
                <p className="text-whiteFactory">Yes, I want to fund the project and also get prototypes.</p>
              </div>
              <div onClick={(e) => {
                e.stopPropagation();
                setIsHidden(true)
                setSection('fp')
              }} className="justify-center flex px-4 py-4 bg-redBase rounded-md cursor-pointer transition duration-200 hover:bg-redHover w-full items-center">
                <p className="text-whiteFactory">No, I just want to fund this project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
