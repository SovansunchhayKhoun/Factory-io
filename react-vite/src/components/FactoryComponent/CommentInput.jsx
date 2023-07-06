import React, {useEffect, useRef, useState} from "react";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";

export const CommentInput = ({project, cmt}) => {
  const {
    submitComment,
    handlePicture,
    commentInput,
    handleCommentInput,
    picture,
    setPicture,
    cmtErrors,
    row,
    setRow,
  } = useCommentContext();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.setSelectionRange(commentInput.length, commentInput.length)
    setRow(Math.ceil((commentInput.length*15)/ref.current.clientWidth))
  }, [commentInput]);

  return (
    <>
      <section className="mt-auto flex flex-col">
        <div className={"flex items-center justify-center gap-4"}>
          <label htmlFor="file-input" className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
            </svg>
            <input onKeyDown={({key, target}) => key === 'Enter' && submitComment(target, project, cmt)}
                   onChange={handlePicture} id={"file-input"} accept={"image/*"} className="hidden" type="file"/>
          </label>
          <textarea ref={ref} autoFocus value={commentInput} onChange={(event) => {
            if (event.key === 'Enter' && event.shiftKey) return
              handleCommentInput(event);
          }} onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submitComment(project, cmt)
            }
            event.key === 'Enter' && event.shiftKey && setRow(row + 1)
            // if (event.key === 'Backspace')
            //   row > 1 && setRow(row - 1)
          }} className="rounded-[20px] w-full placeholder:text-sm p-1 px-4 resize-none"
                    placeholder={"Speak your mind..."} rows={row || 1}></textarea>
          <button onClick={({target}) => submitComment(project, cmt)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
          </button>
        </div>
        <div className={"flex items-center gap-3"}>
          {picture && (
            <div className={"relative border w-fit flex justify-center"}>
              <button
                className={"absolute top-0 right-0 transition duration-100 self-end w-fit text-white bg-[#4E4F50] rounded-[50%] p-2 hover:bg-opacity-90"}
                onClick={(e) => {
                  e.stopPropagation();
                  setPicture(null)
                }}>
                <svg fill="currentColor" viewBox="0 0 24 24" width="1em"
                     className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1qx5ct2 xw4jnvo h-4 w-4">
                  <path
                    d="M18.707 5.293a1 1 0 0 0-1.414 0L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0 0-1.414z"></path>
                </svg>
              </button>
              <img className={"object-contain aspect-square w-[200px]"} src={URL.createObjectURL(picture)} alt=""/>
            </div>
          )}
          <span className={"text-sm text-redBase"}>{cmtErrors && cmtErrors?.image?.map(error => error)}</span>
        </div>
      </section>
    </>
  );
};
