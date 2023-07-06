import {Link} from "react-router-dom";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const CommentNotification = () => {
  const {comments} = useCommentContext();
  const {user} = useAuthContext();
  return (
    <>
      <div className={"flex flex-col gap-3"}>
        {comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id)?.sort((a, b) => new Date(b.comment_time) - new Date(a.comment_time))?.map(cmt => {
          return (
            <div key={cmt?.id} className={""}>
              {/*<Link key={cmt?.id} to={`/project/${cmt?.project_id}`}>*/}
              {/*  <div>{cmt?.user_cmt?.username} commented on project no: {cmt?.project_id}, <br/>message: {cmt?.body},*/}
              {/*    <br/>time: {cmt?.comment_time}, indicator: {cmt?.comment_indicator}</div>*/}
              {/*  <br/>*/}
              {/*</Link>*/}

              <CommentNotiCard cmt={cmt}/>

              {/*{cmt?.replies?.filter(cmt => cmt?.user_id !== user?.id)?.map(cmt => {*/}
              {/*  return (*/}
              {/*    <Link key={cmt?.id} to={`/project/${cmt?.project_id}`}>*/}
              {/*      <div>{cmt?.user_cmt?.username} commented on project no: {cmt?.project_id}, <br/>message: {cmt?.body},*/}
              {/*        <br/>time: {cmt?.comment_time}, indicator: {cmt?.comment_indicator}</div>*/}
              {/*      <br/>*/}
              {/*    </Link>*/}
              {/*  )*/}
              {/*})}*/}
            </div>
          )
        })}

        {comments?.filter(cmt => cmt?.parent_id === null && cmt?.user_id === user?.id)?.map(cmt => {
          return (
            <div key={cmt?.id} className={"flex flex-col gap-3"}>
              {cmt?.replies?.sort((a, b) => new Date(b.comment_time) - new Date(a.comment_time)).filter(cmt => cmt?.replier_id === user?.id).map(cmt => {
                return (
                  <CommentNotiCard key={cmt?.id} cmt={cmt}/>
                  // <Link key={cmt?.id} to={`/project/${cmt?.project_id}`}>
                  //   <div>{cmt?.user_cmt?.username} replied on project
                  //     no: {cmt?.project_id}, <br/>message: {cmt?.body},
                  //     <br/>time: {cmt?.comment_time}, indicator: {cmt?.comment_indicator}</div>
                  //   <br/>
                  // </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  );
};

const CommentNotiCard = ({cmt}) => {
  const {updateCommentIndi} = useCommentContext()
  const getTimePastHour = (time) => {
    return new Date().getHours() - new Date(time).getHours() > 0 ? new Date().getHours() - new Date(time).getHours() : -(new Date().getHours() - new Date(time).getHours());
  }

  const getTimePastMinute = (time) => {
    return new Date(new Date() - new Date(time)).getMinutes()
  }

  return (
    <Link onClick={() => {
      updateCommentIndi(cmt)
    }} to={`/project/${cmt?.project_id}`}>
      <div
        className={`${cmt?.comment_indicator === 0 ? 'bg-whiteFactory shadow-sm' : 'bg-white shadow-xl'} hover:bg-gray-200 cursor-pointer transition duration-200 px-4 py-2 flex items-center gap-2`}>
        <img className={"object-contain rounded-[50%] w-[56px] h-[56px] border"}
             src={`https://robohash.org/${cmt?.user_cmt?.username}`} alt=""/>
        <div>
          <p
            className={`flex gap-2 ${cmt?.comment_indicator === 0 ? 'font-normal' : 'font-semibold'}`}>{cmt?.user_cmt?.username}</p>
          <p
            className={"font-normal text-grayFactory"}>{cmt?.comment_indicator === 1 ? 'commented on your project' : 'replied to your comment'}</p>
          {/*<p className={"font-normal text-sm"}>{cmt?.body}</p>*/}
          <span className="text-xs">
              <span
                className={`${getTimePastHour(cmt?.comment_time) === 0 && 'hidden'} text-grayFactory`}>{getTimePastHour(cmt?.comment_time)}h</span>
              <span
                className={`${getTimePastMinute(cmt?.comment_time) === 0 && 'hidden'} text-grayFactory`}>{getTimePastMinute(cmt?.comment_time)}{getTimePastMinute(cmt?.comment_time) > 1 ? 'minutes' : 'minute'}</span>
            {getTimePastMinute(cmt?.comment_time) === 0 && getTimePastHour(cmt?.comment_time) === 0 &&
              <span className={"text-grayFactory"}>a few seconds</span>}
            <span className="text-grayFactory"> ago</span>
            </span>
        </div>
        {cmt?.comment_indicator !== 0 && <span className="bg-cyan-600 ml-6 w-2 h-2 aspect-square rounded-[50%]"></span>}
      </div>
    </Link>
  )
}
