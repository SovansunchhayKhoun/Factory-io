import {useAuthContext} from "../../context/AuthContext.jsx";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import {comment} from "postcss";
import {CommentInput} from "./CommentInput.jsx";
import autoprefixer from "autoprefixer";
const imgUrl = 'http://127.0.0.1:8000/comments'
export const CommentCard = ({cmt, project}) => {
  const {user} = useAuthContext()
  const {replies, user_cmt, image, body, comment_time} = cmt;
  const {replyOpen, setReplyOpen} = useCommentContext();
  // console.log(body)
  let match = /[\r\n]/.exec(body); // detect break line in input

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className={"flex items-center gap-2 px-2 w-full"}>
        <div className="flex items-center">
          <img src={`https://robohash.org/${user_cmt?.username}`} className={"w-[48px] border rounded-[50%]"} alt=""/>
        </div>
        <div className={"w-fit flex flex-col items-start text-sm px-4 py-4 bg-whiteFactory gap-1 rounded-3xl"}>
          <p className="font-semibold">{user_cmt?.username} <span className={"text-redBase"}>&#x2022;</span> <span
            className="font-normal text-blueActive">follow</span></p>
          {/*<p>{body}</p>*/}
          <textarea rows={match ? match.input.split('\r'+'\n').length : 1} disabled={true} className={"resize-none bg-whiteFactory border-none"} value={body || ''}></textarea>
          {image && (
            <div className={"self-start max-w-[250px]"}>
              <img className={"object-contain aspect-video"} src={`${imgUrl}/${image}`} alt=""/>
            </div>
          )}
          <p className={"text-xs text-grayFactory self-end"}>{new Date(comment_time).toLocaleTimeString().slice(0,4) + new Date(comment_time).toLocaleTimeString().slice(7)}</p>
        </div>
        <div className={"text-right text-grayFactory text-sm"}>
          <button onClick={(e) => {
            e.stopPropagation()
            replyOpen === cmt?.id ? setReplyOpen(0) : setReplyOpen(cmt?.id)
          }}>Reply</button>
        </div>
      </div>
      {replyOpen === cmt?.id && (
        <div className={`flex items-center gap-4 px-8`}>
          <CommentInput cmt={cmt} project={project}/>
        </div>
      )}
      <div className={"px-8 border-l-2"}>
        {replies && replies?.sort((a,b) => b.id - a.id).map(reply => {
          return (
            <CommentCard key={reply.id} project={project} cmt={reply}/>
          )
        })}
      </div>
    </section>
  );
};
