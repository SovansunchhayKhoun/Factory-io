import React from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";

const imgUrl = import.meta.env.VITE_APP_URL +'/projects'
export const NotificationCard = ({project}) => {
  const {user, project_resource, like_time, like_indicator} = project;
  const {projectImages, id} = project_resource[0];
  const {updateIndicator} = useProjectContext()
  const getTimePastHour = (time) => {
    return new Date().getHours() - new Date(time).getHours() > 0 ? new Date().getHours() - new Date(time).getHours() : -(new Date().getHours() - new Date(time).getHours());
  }

  const getTimePastMinute = (time) => {
    return new Date(new Date() - new Date(time)).getMinutes()
  }

  return (
    <Link to={`/project/${id}`} onClick={() => updateIndicator(project)}
          className={`${like_indicator === 0 ? 'bg-whiteFactory shadow-sm' : 'bg-white shadow-xl'} transition rounded-md duration-300 px-4 flex justify-between hover:bg-gray-200 cursor-pointer`}>
      <div className="flex items-center gap-4">
        <img className={"w-[56px] h-[56px] rounded-[50%] border"} src={`https://robohash.org/${user?.username}`}
             alt=""/>
        <div className="">
          <p className={`${like_indicator === 0 ? 'font-normal' : 'font-semibold'}`}>{user?.username}</p>
          <p className="text-sm">Liked your post.&nbsp;
            <span className="text-xs">
              <span
                className={`${getTimePastHour(like_time) === 0 && 'hidden'} text-grayFactory`}>{getTimePastHour(like_time)}h</span>
              <span
                className={`${getTimePastMinute(like_time) === 0 && 'hidden'} text-grayFactory`}>{getTimePastMinute(like_time)}{getTimePastMinute(like_time) > 1 ? 'minutes' : 'minute'}</span>
              {getTimePastMinute(like_time) === 0 && getTimePastHour(like_time) === 0 &&
                <span className={"text-grayFactory"}>a few seconds</span>}
              <span className="text-grayFactory"> ago</span>
            </span>
          </p>
        </div>
        {like_indicator === 1 && <span className="bg-cyan-600 w-2 h-2 aspect-square rounded-[50%]"></span>}
      </div>
      <div className="rounded-md">
        <img className="object-contain rounded-md aspect-square w-[96px] p-2"
             src={`${imgUrl}/${projectImages[0]?.image}`} alt=""/>
      </div>
    </Link>
  );
};
