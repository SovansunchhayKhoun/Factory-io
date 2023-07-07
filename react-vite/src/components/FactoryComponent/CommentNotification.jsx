import {Link} from "react-router-dom";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {CommentView, ProjectComment} from "./ProjectComment.jsx";
import AdminPopUp from "../Modals/AdminPopUp.jsx";

export const CommentNotification = () => {
  const {comments} = useCommentContext();
  const {user} = useAuthContext();
  return (
    <>
      <div className={"flex flex-col"}>
        {comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id && !cmt.parent_id)?.sort((a, b) => new Date(b.comment_time) - new Date(a.comment_time))?.map(cmt => {
          return (
            <div key={cmt?.id} className={""}>
              <CommentNotiCard cmt={cmt} showReply={true}/>
            </div>
          )
        })}

        {comments?.filter(cmt => cmt?.replier_id === user?.id)?.sort((a, b) => new Date(b.comment_time) - new Date(a.comment_time))?.map(cmt => {
          return (
            <div key={cmt?.id} className={""}>
              <CommentNotiCard showReply={false} cmt={cmt}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

const CommentNotiCard = ({cmt, showReply}) => {
  const {user} = useAuthContext();
  const {updateCommentIndi} = useCommentContext()
  const getTimePastHour = (time) => {
    return new Date().getHours() - new Date(time).getHours() > 0 ? new Date().getHours() - new Date(time).getHours() : -(new Date().getHours() - new Date(time).getHours());
  }

  const getTimePastMinute = (time) => {
    return new Date(new Date() - new Date(time)).getMinutes()
  }

  return (
    <Link to={`/project/${cmt?.project?.id}`} onClick={(e) => {
      e.stopPropagation()
      updateCommentIndi(cmt)
    }}>
      <div
        className={`${cmt?.comment_seen === 1 ? 'bg-whiteFactory shadow-sm' : 'bg-white shadow-xl'} rounded-md hover:bg-gray-200 cursor-pointer transition duration-200 px-4 py-2 flex items-center gap-2`}>
        <img className={"object-contain rounded-[50%] w-[56px] h-[56px] border"}
             src={`https://robohash.org/${cmt?.user_cmt?.username}`} alt=""/>
        <div>
          <p
            className={`flex gap-2 ${cmt?.comment_seen === 1 ? 'font-normal' : 'font-semibold'}`}>{cmt?.user_cmt?.username}</p>
          <p
            className={"font-normal text-grayFactory"}>{cmt?.comment_indicator === 1 && 'commented on your project'} {cmt?.comment_indicator === 2 && 'replied to your comment'}</p>
          {/*<p className={"font-normal text-sm"}>{cmt?.body}, id:{cmt?.id + "," + cmt?.parent_id}</p>*/}
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
        {cmt?.comment_seen === 0 && <span className="bg-cyan-600 ml-6 w-2 h-2 aspect-square rounded-[50%]"></span>}
      </div>
      {showReply && cmt?.replies?.filter(cmt => cmt?.user_id !== user?.id).map(cmt => {
        return (
          <CommentNotiCard key={cmt?.id} showReply={showReply} cmt={cmt}/>
        )
      })}
    </Link>
  )
}
