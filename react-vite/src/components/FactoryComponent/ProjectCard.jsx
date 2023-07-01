import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {Carousel, Spinner} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";

const imgUrl = `http://127.0.0.1:8000/projects`
export const ProjectCard = ({project}) => {
  const {user} = useAuthContext();
  const {id, name, projectImages, like_count} = project;
  const {username} = project.user;
  const {postLike} = useProjectContext();

  return (
    <>
      <div className="max-w-[400px] flex flex-col bg-whiteFactory shadow-blueHover shadow-md rounded-md">
        <div className="justify-center flex-1 text-sm px-4 py-3 flex flex-col gap-2">
          <div className="bg-[#D9D9D9] flex justify-center shadow-blueActive shadow-sm rounded-md">
            <Carousel>
              {projectImages?.map((projectImage) => {
                return (
                  <img key={projectImage?.id} loading="lazy" className="relative w-fit object-contain max-h-[270px]"
                       src={`${imgUrl}/${projectImage?.image}`} alt=""/>
                )
              })}
            </Carousel>

          </div>
          <Link to={`/project/${id}`}>
            <span className="font-semibold overflow-hidden text-ellipsis">
              {name}
            </span>
            <div className="text-grayFactory">
              {username}
            </div>
          </Link>
        </div>

        {/*comment part*/}
        <div
          className={"border-t-2 border-grayFactory mt-auto px-4 pt-2 pb-3 flex items-center gap-x-3 justify-between"}>
          {/*star icon*/}
          <button onClick={() => {
            postLike(project);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F24E1E"
                 className="w-6 h-6">
              <path fill={`${project.like_state?.filter(pro => pro.user_id === user?.id)[0]?.like_state === 1 && '#F24E1E'}`} strokeLinecap="round" strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
            </svg>
            <span className="font-semibold text-sm">
              {like_count}
            </span>
          </button>
          {/*comment icon*/}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path
                d="M10.4999 7.37516C10.2939 7.37516 10.0925 7.43626 9.9212 7.55071C9.7499 7.66517 9.61639 7.82786 9.53755 8.0182C9.4587 8.20854 9.43808 8.41798 9.47827 8.62005C9.51846 8.82211 9.61767 9.00772 9.76335 9.1534C9.90903 9.29908 10.0946 9.39829 10.2967 9.43848C10.4988 9.47867 10.7082 9.45805 10.8985 9.3792C11.0889 9.30036 11.2516 9.16685 11.366 8.99555C11.4805 8.82425 11.5416 8.62285 11.5416 8.41683C11.5416 8.14056 11.4318 7.87561 11.2365 7.68026C11.0411 7.48491 10.7762 7.37516 10.4999 7.37516ZM17.7916 0.0834961H3.20825C2.37945 0.0834961 1.58459 0.412736 0.998543 0.998787C0.412492 1.58484 0.083252 2.37969 0.083252 3.2085V13.6252C0.083252 14.454 0.412492 15.2488 0.998543 15.8349C1.58459 16.4209 2.37945 16.7502 3.20825 16.7502H15.2812L19.1353 20.6147C19.2327 20.7113 19.3481 20.7877 19.475 20.8395C19.6019 20.8913 19.7378 20.9176 19.8749 20.9168C20.0116 20.9203 20.1471 20.8918 20.2708 20.8335C20.461 20.7554 20.6238 20.6226 20.7388 20.4521C20.8537 20.2816 20.9156 20.0808 20.9166 19.8752V3.2085C20.9166 2.37969 20.5873 1.58484 20.0013 0.998787C19.4152 0.412736 18.6204 0.0834961 17.7916 0.0834961ZM18.8333 17.3647L16.4478 14.9689C16.3505 14.8724 16.2351 14.796 16.1082 14.7442C15.9812 14.6923 15.8453 14.666 15.7083 14.6668H3.20825C2.93198 14.6668 2.66703 14.5571 2.47168 14.3617C2.27633 14.1664 2.16659 13.9014 2.16659 13.6252V3.2085C2.16659 2.93223 2.27633 2.66728 2.47168 2.47193C2.66703 2.27658 2.93198 2.16683 3.20825 2.16683H17.7916C18.0679 2.16683 18.3328 2.27658 18.5282 2.47193C18.7235 2.66728 18.8333 2.93223 18.8333 3.2085V17.3647ZM6.33325 7.37516C6.12723 7.37516 5.92583 7.43626 5.75453 7.55071C5.58323 7.66517 5.44972 7.82786 5.37088 8.0182C5.29204 8.20854 5.27141 8.41798 5.3116 8.62005C5.35179 8.82211 5.451 9.00772 5.59668 9.1534C5.74236 9.29908 5.92797 9.39829 6.13003 9.43848C6.3321 9.47867 6.54154 9.45805 6.73188 9.3792C6.92222 9.30036 7.08491 9.16685 7.19937 8.99555C7.31383 8.82425 7.37492 8.62285 7.37492 8.41683C7.37492 8.14056 7.26517 7.87561 7.06982 7.68026C6.87447 7.48491 6.60952 7.37516 6.33325 7.37516ZM14.6666 7.37516C14.4606 7.37516 14.2592 7.43626 14.0879 7.55071C13.9166 7.66517 13.7831 7.82786 13.7042 8.0182C13.6254 8.20854 13.6047 8.41798 13.6449 8.62005C13.6851 8.82211 13.7843 9.00772 13.93 9.1534C14.0757 9.29908 14.2613 9.39829 14.4634 9.43848C14.6654 9.47867 14.8749 9.45805 15.0652 9.3792C15.2556 9.30036 15.4182 9.16685 15.5327 8.99555C15.6472 8.82425 15.7083 8.62285 15.7083 8.41683C15.7083 8.14056 15.5985 7.87561 15.4032 7.68026C15.2078 7.48491 14.9429 7.37516 14.6666 7.37516Z"
                fill="#1037A9"/>
            </svg>
          </button>
          {/*save post icon*/}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill="none">
              <path
                d="M0.208252 18.875V2.20833C0.208252 1.63542 0.412418 1.14479 0.820752 0.73646C1.22909 0.328127 1.71936 0.124307 2.29159 0.125002H12.7083C13.2812 0.125002 13.7718 0.329168 14.1801 0.737502C14.5885 1.14584 14.7923 1.63611 14.7916 2.20833V18.875L7.49992 15.75L0.208252 18.875ZM2.29159 15.6979L7.49992 13.4583L12.7083 15.6979V2.20833H2.29159V15.6979Z"
                fill="#8A0000"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
