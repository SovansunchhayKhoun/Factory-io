import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import React, {useEffect} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const UploadProjectForm = ({setModalOpen, modalOpen}) => {
  const {
    setErrors,
    errors,
    picture,
    setPicture,
    handlePicture,
    handleFile,
    setProjectValues,
    projectValues,
    postProject
  } = useProjectContext();

  const {user} = useAuthContext();
  useEffect(() => {
    setErrors({});
  }, [modalOpen]);

  return (
    <>
      <section className="text-blackFactory rounded-md">

        <section className="flex items-center justify-between border-b-2 border-grayFactory">
          <div>Upload Project</div>
          <button onClick={(e) => {
            e.stopPropagation();
            setModalOpen(false);
          }} className="transition duration-200 border rounded-[50%] hover:bg-blackFactory/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor"
                 className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </section>

        <section className="p-4 gap-3 flex">
          <div className="flex gap-2 flex-col w-[440px] ">
            <label
              className={`${picture && 'flex-grow-0'} max-w-[440px] flex-1 transition duration-200 flex items-center justify-center bg-gray-300 border rounded-md hover:bg-gray-500 cursor-pointer`}
              htmlFor="projectImage">
              <div className={`${picture && 'hidden'} flex items-center gap-2`}>
                {/*image icon*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                </svg>
                Add Photos
              </div>
              <input type="file" id="projectImage" className="hidden" accept="image/*" onChange={(event) => {
                handlePicture(event)
              }}/>
              {picture && (
                <div className="relative">
                  <button onClick={() => {
                    setPicture('');
                    setProjectValues({...projectValues, image: ''})
                  }}
                          className={`bg-blackFactory text-whiteFactory absolute top-1 right-1 transition duration-200 rounded-[50%] hover:bg-blackFactory/50`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor"
                         className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                  <img loading="lazy" className="object-contain" src={URL.createObjectURL(picture)} alt=""/>
                </div>
              )}
            </label>
            <span className="text-redBase text-sm w-[70%]">{errors?.image?.map(error => error)}</span>
            <label
              className="transition duration-200 text-whiteFactory bg-redHover rounded-md text-center py-2 hover:bg-redBase cursor-pointer"
              htmlFor="projectFile">
              Upload File
              <input onChange={event => handleFile(event)} id="projectFile" type="file" accept=".zip,.rar,.7z,.gz"
                     className="hidden"/>
            </label>
            <span className="text-redBase text-sm w-[70%]">{errors?.file?.map(error => error)}</span>
          </div>

          <div className="flex-1 flex flex-col gap-3 justify-center">

            <div className="flex gap-3">
              <div className="flex flex-col items-start">
                <label htmlFor="projectName">
                  Project's Name
                </label>
                <input value={projectValues.name} onChange={event => setProjectValues({...projectValues, name: event.target.value})}
                       className="rounded-md" name="projectName" type="text"/>
                <span className="text-redBase text-sm w-[70%]">{errors?.name?.map(error => error)}</span>
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="projectCate">
                  Category
                </label>
                <input value={projectValues.category} onChange={event => setProjectValues({...projectValues, category: event.target.value})}
                       className="rounded-md" name="projectCate" type="text"/>
                <span className="text-redBase text-sm w-[70%]">{errors?.category?.map(error => error)}</span>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="description">
                Description
              </label>
              <textarea value={projectValues.description} onChange={event => setProjectValues({...projectValues, description: event.target.value})}
                        name="description" id="" className="w-full rounded-md" rows="5"></textarea>
            </div>

            <div className="flex justify-between">

              <div className="flex flex-col items-start">
                <label htmlFor="target_fund">Target Amount</label>
                <input value={projectValues.target_fund} id="target_fund" onChange={event => setProjectValues({
                  ...projectValues,
                  target_fund: Number(event.target.value) && Number(event.target.value)
                })} className="rounded-md" min="0" type="number"/>
                <span className=" text-redBase text-sm w-[70%]">{errors?.target_fund?.map(error => error)}</span>
              </div>

              <div className="flex flex-col items-end">
                <label className="self-start" htmlFor="projectDeadline">Deadline</label>
                <input value={projectValues.project_deadline} onChange={event => setProjectValues({...projectValues, project_deadline: event.target.value})}
                       className={`${errors?.project_deadline && 'w-full'} rounded-md`} type="date" name="projectDeadline"/>
                <span className="self-start text-redBase text-sm w-[70%]">{errors?.project_deadline?.map(error => error)}</span>
              </div>

            </div>
            <button
              onClick={() => postProject(setModalOpen, user)}
              className="transition duration-150 bg-blueBase text-whiteFactory py-2 rounded-md font-semibold hover:bg-blueHover">
              Post
            </button>
          </div>
        </section>
        <section className="">

        </section>
      </section>
    </>
  )
}
