import {useAuthContext} from "../../context/AuthContext.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import {NotificationCard} from "../../components/FactoryComponent/NotificationCard.jsx";
import {useEffect, useState} from "react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {Link} from "react-router-dom";

export const NotificationView = () => {
  const {user} = useAuthContext();
  const {userLike, userLikeIsLoading} = useProjectContext();
  const [notiTab, setNotiTab] = useState('all');

  if (!userLikeIsLoading) {
    return (
      <main className="flex justify-between">
        <section className="flex flex-col h-fit items-center pr-36 border-r-2 border-grayFactory gap-4">
          <button className={`${notiTab === 'all' && 'text-redBase'}`} onClick={() => setNotiTab('all')}>All</button>
          <button className={`${notiTab === 'follow' && 'text-redBase'}`} onClick={() => setNotiTab('follow')}>Follow
          </button>
          <button className={`${notiTab === 'like' && 'text-redBase'}`} onClick={() => setNotiTab('like')}>Liked
          </button>
          <button className={`${notiTab === 'cmt' && 'text-redBase'}`} onClick={() => setNotiTab('cmt')}>Comments
          </button>
        </section>
        <section className="w-full flex flex-col gap-4 p-6">
          {userLike?.filter(pro => pro.user_id !== user?.id)?.length === 0 && <span>No notifications just yet, <Link
            className="font-semibold">Maybe follow some new Makers?</Link></span>}
          {userLike?.filter(pro => pro.user_id !== user?.id)?.map(pro => {
            return (
              <NotificationCard key={pro?.id} project={pro}/>
            )
          })}
        </section>
        <section>
          <FloatingUser user={user}/>
        </section>
      </main>
    );
  }
};
