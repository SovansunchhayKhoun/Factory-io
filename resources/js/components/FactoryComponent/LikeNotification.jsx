import React from "react";
import {Link} from "react-router-dom";
import {NotificationCard} from "./NotificationCard.jsx";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const LikeNotification = () => {
  const {userLike} = useProjectContext();
  const {user} = useAuthContext();
    return (
      <div className={"flex flex-col"}>
        {/*{userLike?.filter(pro => pro.user_id !== user?.id)?.length === 0 && <span>No notifications just yet, <Link*/}
        {/*  className="font-semibold">Maybe follow some new Makers?</Link></span>}*/}
        {userLike?.filter(pro => pro.user_id !== user?.id)?.map(pro => {
          return (
            <NotificationCard key={pro?.id} project={pro}/>
          )
        })}
      </div>
    );
};
