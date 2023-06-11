import React from "react";
import {Dropdown} from "flowbite-react";
import {ProjectCard} from "../../../components/FactoryComponent/ProjectCard.jsx";

export const RD = () => {
  const FilterComponent = () => {
    return (
      <>
        <div className="flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M9.16655 15C8.93044 15 8.73239 14.928 8.57239 14.784C8.41239 14.64 8.33266 14.462 8.33322 14.25V9.75L3.49989 4.2C3.29155 3.95 3.26016 3.6875 3.40572 3.4125C3.55127 3.1375 3.80489 3 4.16655 3H15.8332C16.1943 3 16.4479 3.1375 16.5941 3.4125C16.7402 3.6875 16.7088 3.95 16.4999 4.2L11.6666 9.75V14.25C11.6666 14.4625 11.5866 14.6407 11.4266 14.7847C11.2666 14.9287 11.0688 15.0005 10.8332 15H9.16655Z"
              fill="#699BF7"/>
          </svg>
          <span className="text-blackFactory">Filter</span>
        </div>
      </>
    )
  }
  return (
    <main className="flex flex-col gap-3 mr-24">
      <section className="flex justify-between">
        <Dropdown style={{background: "#D9D9D9", padding: 0}} arrowIcon={false} label={<FilterComponent/>}>
          <Dropdown.Item>
            Item 1
          </Dropdown.Item>
        </Dropdown>
        <button className="bg-[#699BF7] text-whiteFactory px-8 py-2 rounded-[20px] shadow-[#699BF7] shadow-lg">
          Upload Project
        </button>
      </section>
      <section className="grid grid-cols-2 gap-6">
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </section>
    </main>
  )
}
