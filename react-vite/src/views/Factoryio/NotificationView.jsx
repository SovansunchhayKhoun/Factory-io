import {useAuthContext} from "../../context/AuthContext.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import {NotificationCard} from "../../components/FactoryComponent/NotificationCard.jsx";
import {useEffect, useState} from "react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {Link, Outlet} from "react-router-dom";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import {CommentNotification} from "../../components/FactoryComponent/CommentNotification.jsx";
import {LikeNotification} from "../../components/FactoryComponent/LikeNotification.jsx";

export const NotificationView = () => {
  const {user} = useAuthContext();
  const {userLikeIsLoading, userLike, likeNotiCount} = useProjectContext();
  const [notiTab, setNotiTab] = useState('all');
  const {comments, commentNotiCount} = useCommentContext();
  // const commentNotiCount = parseInt(comments?.filter(cmt => cmt?.parent_id === null && cmt?.user_id === user?.id)?.map(cmt => cmt.replies?.filter(cmt => cmt?.replier_id === user?.id)?.length)) +
  //   parseInt(comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id)?.length);
  // const likeNotiCount = userLike?.filter(pro => pro.user_id !== user?.id)?.length;

  if (!userLikeIsLoading) {
    return (
      <main className="flex justify-between">
        <section className="flex flex-col h-fit items-center pr-36 border-r-2 border-grayFactory gap-4">
          <button className={`${notiTab === 'all' && 'text-redBase'} flex items-center gap-1`}
                  onClick={() => setNotiTab('all')}>
            All
            <span
              className={`${comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id)?.length +
              comments?.filter(cmt => cmt?.parent_id === null && cmt?.user_id === user?.id)?.length + likeNotiCount === '0' && 'hidden'} bg-redHover aspect-square w-5 text-xs flex justify-center items-center text-whiteFactory rounded-[50%]`}>
              {commentNotiCount + likeNotiCount}
            </span>
          </button>
          <button className={`${notiTab === 'follow' && 'text-redBase'} flex items-center gap-1`}
                  onClick={() => setNotiTab('follow')}>
            Follow
          </button>
          <button className={`${notiTab === 'like' && 'text-redBase'} flex items-center gap-1`}
                  onClick={() => setNotiTab('like')}>
            Liked
            <span
              className={`${likeNotiCount === 0 && 'hidden'} bg-redHover aspect-square w-5 text-xs flex justify-center items-center text-whiteFactory rounded-[50%]`}>
              {likeNotiCount}
            </span>
          </button>
          <button className={`${notiTab === 'cmt' && 'text-redBase'} flex items-center gap-1`}
                  onClick={() => setNotiTab('cmt')}>
            Comments
            <span
              className={`${commentNotiCount === 0 && 'hidden'} bg-redHover aspect-square w-5 text-xs flex justify-center items-center text-whiteFactory rounded-[50%]`}>
              {commentNotiCount}
            </span>
          </button>
        </section>
        <section className="w-full flex flex-col gap-4 p-6">
          <FilterNoti commentNotiCount={commentNotiCount} likeNotiCount={likeNotiCount} notiTab={notiTab}/>
        </section>
        <section>
          <FloatingUser user={user}/>
        </section>
      </main>
    );
  }
};

const FilterNoti = ({notiTab, likeNotiCount, commentNotiCount}) => {
  const {user} = useAuthContext()
  const {comments} = useCommentContext();
  const {userLike} = useProjectContext()
  // console.log(projects?.filter(pro => pro.user_id === user?.id)?.forEach(pro =>)a.comments)
  if (notiTab === 'all') {
    return (
      <div className={"flex flex-col gap-3"}>
        {commentNotiCount + likeNotiCount === 0 &&
          <span>No activity</span>}
        <LikeNotification/>
        <CommentNotification/>
      </div>
    )
  }

  if (notiTab === 'follow') {
    return (
      <div>
        Follow tab
      </div>
    )
  }

  if (notiTab === 'like') {
    return (
      <div className={""}>
        {likeNotiCount === 0 && <div>No activity just yet</div>}
        <LikeNotification/>
      </div>
    )
  }

  if (notiTab === 'cmt') {
    return (
      <div>
        {commentNotiCount === 0 &&
          <div>No activity just yet</div>}
        <CommentNotification/>
      </div>
    )
  }
}
