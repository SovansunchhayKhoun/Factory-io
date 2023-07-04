import {useAuthContext} from "../../context/AuthContext.jsx";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import React, {useState} from "react";

export const CommentCard = ({cmt, project}) => {
  const {user} = useAuthContext()
  const {replies, user_cmt} = cmt;
  const {replyComment, handleCommentInput, commentInput} = useCommentContext();
  const [replyOpen, setReplyOpen] = useState(false);
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className={"flex items-center gap-2 px-2 w-full"}>
        <div className="flex items-center">
          <img src={`https://robohash.org/${user_cmt?.username}`} className={"w-[48px] border rounded-[50%]"} alt=""/>
        </div>
        <div className={"w-fit flex flex-col text-sm px-4 py-4 bg-whiteFactory gap-1 rounded-3xl"}>
          <p className="font-semibold">{user_cmt?.username} <span className={"text-redBase"}>&#x2022;</span> <span
            className="font-normal text-blueActive">follow</span></p>
          <p>{cmt.body}</p>
        </div>
        <div className={"text-right text-grayFactory text-sm"}>
          <button onClick={(e) => {
            e.stopPropagation()
            setReplyOpen(!replyOpen)
          }}>Reply</button>
        </div>
      </div>
      <div className={`${!replyOpen && 'hidden'} flex items-center gap-4 px-8`}>
        <div className="flex items-center">
          <img src={`https://robohash.org/${user?.username}`} className={"w-[48px] border rounded-[50%]"} alt=""/>
        </div>
        <div className={"flex gap-3"}>
          <input value={commentInput} onChange={handleCommentInput} type="text" className="rounded-[20px] placeholder:text-sm p-1 px-4"
                 placeholder={"Speak your mind..."}/>
          <button onClick={() => replyComment(cmt, project, setReplyOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={"px-8 border-l-2"}>
        {replies && replies?.map(reply => {
          return (
            <CommentCard key={reply.id} project={project} cmt={reply}/>
          )
        })}
      </div>
    </section>
  );
};
