import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Rating} from "@mui/material";
import {PVFactoryHub} from "../../components/FactoryComponent/Tabs/PVFactoryHub.jsx";
import {PVProjectTab} from "../../components/FactoryComponent/Tabs/PVProjectTab.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";
import {FundProjectContent} from "../FundProjectContent.jsx";
import {Carousel} from "flowbite-react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import UserContext from "../../context/UserContext.jsx";
import {ProjectStar} from "../../components/FactoryComponent/ProjectStar.jsx";
import {ProjectSave} from "../../components/FactoryComponent/ProjectSave.jsx";
import {ProjectComment} from "../../components/FactoryComponent/ProjectComment.jsx";
import {ImageExpand} from "../../components/ImageExpand.jsx";
import chatContext from "../../context/ChatContext.jsx";
import FundingContext from "../../context/FundingContext.jsx";

const imgUrl = import.meta.env.VITE_APP_URL + '/projects';
export const ProjectView = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const {users} = useContext(UserContext);
  const {initChat} = useContext(chatContext)
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const {postLike, postSave} = useProjectContext();
  const {setSection,setCurrentItem} = useContext(FundingContext)

  const {data: project, refetch: projectReFetch, isLoading: projectIsLoading} = useQuery(['project', id], () => {
    return Axios.get(`projects/${id}`).then(res => {
      return res.data.data;
    })
  })

  const postDate = `${new Date(project?.created_at.slice(0, 10)).getDate()}-${monthNames[new Date(project?.created_at.slice(0, 10)).getMonth()]}-${new Date(project?.created_at.slice(0, 10)).getFullYear()}`

  const [tab, setTab] = useState('fh');
  const [expand, setExpand] = useState(false)
  const [imgExpand, setImgExpand] = useState('');

  useEffect(() => {
    projectReFetch()
  }, [postLike, postSave]);

  const StarIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F24E1E"
           className="w-5 h-5">
        <path fill="#F24E1E" strokeLinecap="round" strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
      </svg>
    )
  }

  return (
    <main className="flex justify-between gap-24">
      <section className="w-full flex flex-col gap-4">
        <button onClick={() => {
          navigate(-1)
        }}>
          <img src="/assets/images/arrow-left.png" alt=""/>
        </button>

        <section className="flex flex-col">
          <section className="rounded-md flex gap-6 shadow-2xl px-6 py-4">
            <section className="w-full">
              <Carousel>
                {project?.projectImages?.map(projectImage => {
                  return (
                    <button key={projectImage.id}
                            onClick={(e) => {
                      e.stopPropagation()
                      setExpand(!expand)
                      setImgExpand(projectImage.image)
                    }} className={"relative flex justify-center"}>
                        <img className=" max-h-[350px] object-contain bg-grayFactory"
                             loading={"lazy"}
                             src={`${imgUrl}/${projectImage?.image}`} alt=""/>
                    </button>
                  )
                })}
              </Carousel>
              <ImageExpand imgSrc={`${imgUrl}/${imgExpand}`} setOpen={setExpand} open={expand}/>
            </section>

            <section className='justify-center flex flex-col w-full gap-y-3'>

              <section className='flex flex-col gap-3'>
                <div className="flex items-center gap-x-2">
                  <div className="w-[56px] h-[56px] border rounded-[50%]">
                    <img loading={'lazy'} src={`https://robohash.org/${project?.user.username}`} alt=""/>
                  </div>
                  <div>
                    <p className="font-semibold">{project?.user?.username}</p>
                    <p>{postDate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-2xl font-semibold">
                    <p>{project?.name}</p>
                    <Rating
                      icon={<StarIcon/>}
                      name="read-only" readOnly
                      value={(project?.like_count) * 5 / users?.length} /*value = total_rating / total_user*/ />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      initChat('admin', user.username)
                      setSection('fp')
                      setModalOpen(true)
                    }}
                    className="rounded-[20px] px-4 py-2 text-whiteFactory bg-redHover">
                    Fund this project
                  </button>
                  <AdminPopUp content={<FundProjectContent project={project} projectPrototypes={project?.projectPrototypes} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
                              modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                </div>

                <p className="w-[80%]">{project?.description}</p>

                <section className="flex py-4 justify-between border-y-2 border-[#D9D9D9]">
                  <div className='flex flex-col items-center'>
                    <div>500$</div>
                    <div className=''>Target of <span className="text-redHover">${project?.target_fund}</span></div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className='flex justify-center'>10</div>
                    <div className='flex '>Funder</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className=''>Deadline</div>

                    <div className='flex '>{project?.project_deadline.slice(0, 10)}</div>
                  </div>
                </section>
                {/*comment part*/}
                <section
                  className={"px-4 pt-2 pb-3 flex items-center gap-x-3 justify-between"}>
                  <ProjectStar project={project} iconWidth={8} iconHeight={8}/>
                  <ProjectComment project={project} iconWidth={24} iconHeight={24}/>
                  <ProjectSave project={project} iconWidth={8} iconHeight={8}/>
                </section>
              </section>
            </section>
          </section>

          <section className="flex gap-4">

            <section className='pt-4 flex flex-col border-r-2 border-blackFactory h-[150px]'>
              <button
                className={`${tab === 'fh' && 'bg-[#D9D9D9]'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-[#D9D9D9]`}
                onClick={() => setTab('fh')}>Factory Hub
              </button>
              <button
                className={`${tab === 'project' && 'bg-[#D9D9D9]'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-[#D9D9D9]`}
                onClick={() => setTab('project')}>Project
              </button>
            </section>

            <section className="pt-4 w-full">
              {tab === 'fh' && <PVFactoryHub project={project}/>}
              {tab === 'project' && <PVProjectTab setSection={setSection} setCurrentItem={setCurrentItem} user={user} initChat={initChat} project={project} projectPrototypes={project?.projectPrototypes}/>}
            </section>
          </section>
        </section>
      </section>
      <FloatingUser user={user}/>
    </main>
  );
};
