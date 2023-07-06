import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {NotificationCard} from "../components/FactoryComponent/NotificationCard.jsx";
import {FloatingUser} from "../components/FactoryComponent/FloatingUser.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import {tab} from "@material-tailwind/react";
import {SearchAllTab} from "./SearchAllTab.jsx";
import userContext from "../context/UserContext.jsx";
import {useProjectContext} from "../context/Factory/ProjectContext.jsx";
import {ProjectCard} from "../components/FactoryComponent/ProjectCard.jsx";
import {SearchUserCard} from "../components/FactoryComponent/SearchUserCard.jsx";

export const SearchContent =  ({modalOpen,setModalOpen}) => {
  const [searchTab, setSearchTab] = useState('all');
  const [searchInput, setSearchInput] = useState('')
  const {users} = useContext(userContext)
  const {projects} = useProjectContext()
  const [filteredUser, setFilteredUser] = useState([])
  const [filteredProject, setFilteredProject] = useState([])
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
    setFilteredUser(
      users?.filter((user) => {
        if (e.target.value !== "") {
          if (
            user?.username.toLowerCase().includes(searchInput.toLowerCase())
            || user?.firstName.toLowerCase().includes(searchInput.toLowerCase())
            || user?.lastName.toLowerCase().includes(searchInput.toLowerCase)) {
            return user
          }
        }
      })
    )
    setFilteredProject(
      projects?.filter((project) => {
        if (e.target.value !== "") {
          if (
            project?.name.toLowerCase().includes(searchInput.toLowerCase())
            || project?.category.toLowerCase().includes(searchInput.toLowerCase())){
            return project
          }
        }
      })
    )
  }
  const {user} = useAuthContext();
    return (
      <>
        <main className="min-w-[1920px]:px-48 xl:px-24 md:px-12
        w-screen h-screen overflow-auto py-4 text-blackFactory rounded-md bg-whiteFactory gap-y-8 flex flex-col">
          <div className={"flex justify-center items-center"}>
            <div>
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
            <div className={`w-1/3 mx-auto`}>
              <input type="text"
              placeholder="Search..."
                     value={searchInput}
                     onChange={(e) => handleSearchInput(e)}
              style={{
              backgroundColor: "#D9D9D9",
            }}
              className="w-[100%] px-12 search-bar py-1 border rounded-[50px] bg-[#D9D9D9]"
              />
            </div>
          </div>
          <section className="flex justify-between">
            <section className="flex flex-col h-fit items-center pr-24 border-r-2 border-grayFactory gap-4">
              <button className={`${searchTab === 'all' && 'text-redBase'}`} onClick={() => setSearchTab('all')}>All</button>
              <button className={`${searchTab === 'users' && 'text-redBase'} whitespace-nowrap`} onClick={() => setSearchTab('users')}>Users
              </button>
              <button className={`${searchTab === 'projects' && 'text-redBase'} whitespace-nowrap`} onClick={() => setSearchTab('projects')}>Projects
              </button>
              {/*<button className={`${notiTab === 'like' && 'text-redBase'} whitespace-nowrap`} onClick={() => setSearchTab('like')}>Followed Users*/}
              {/*</button>*/}
            </section>
            <section className="w-full flex flex-col gap-4 p-6 justify-start items-center">
              {filteredUser?.length === 0 && filteredProject?.length === 0 &&
                <div className={`px-4 py-8 rounded-md shadow-2xl text-center w-full`}>
                  No recent searches
                </div>
              }
              {searchTab === 'all' &&
                <>
                  {filteredUser?.slice(0,5).map((user,key) => {
                    return (
                      <SearchUserCard user={user} key={key}/>
                    )
                  })}
                  {filteredUser.length !== 0 &&
                    <p
                      onClick={(e) => setSearchTab('users')}
                      className={`hover:underline text-blueBase cursor-pointer`}>
                      See more users
                    </p>
                  }
                  {filteredProject?.slice(0,5).map((project,key) => {
                    return (
                      <ProjectCard setSearchInput={setSearchInput} setModalOpen={setModalOpen} key={key} project={project}/>
                    )
                  })}
                  {filteredProject.length !== 0 &&
                    <p
                      onClick={(e) => setSearchTab('projects')}
                      className={`hover:underline text-blueBase cursor-pointer`}>
                      See more projects
                    </p>
                  }
                </>}
              {searchTab === 'users' &&
                <>
                  {filteredUser?.map((user,key) => {
                    return (
                      <SearchUserCard user={user} key={key}/>
                    )
                  })}
                </>}
              {searchTab === 'projects' &&
                <>
                  {filteredProject?.map((project,key) => {
                    return (
                      <ProjectCard setSearchInput={setSearchInput} setModalOpen={setModalOpen} key={key} project={project}/>
                    )
                  })}
                </>}
            </section>
            <section>
              <FloatingUser user={user}/>
            </section>
          </section>
        </main>
      </>
    )
}
