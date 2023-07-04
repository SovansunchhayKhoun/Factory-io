import React, {useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {CommentCard} from "./CommentCard.jsx";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";

export const ProjectComment = ({iconWidth, iconHeight}) => {
  const [cmtOpen, setCmtOpen] = useState(false);
  const {comments} = useCommentContext()

  // console.log(comments[0].body)
  return (
    <>
      {/*comment icon*/}
      <button onClick={(e) => {
        e.stopPropagation();
        setCmtOpen(true);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth || 21}`} height={`${iconHeight || 21}`}
             viewBox="0 0 21 21" fill="none">
          <path
            d="M10.4999 7.37516C10.2939 7.37516 10.0925 7.43626 9.9212 7.55071C9.7499 7.66517 9.61639 7.82786 9.53755 8.0182C9.4587 8.20854 9.43808 8.41798 9.47827 8.62005C9.51846 8.82211 9.61767 9.00772 9.76335 9.1534C9.90903 9.29908 10.0946 9.39829 10.2967 9.43848C10.4988 9.47867 10.7082 9.45805 10.8985 9.3792C11.0889 9.30036 11.2516 9.16685 11.366 8.99555C11.4805 8.82425 11.5416 8.62285 11.5416 8.41683C11.5416 8.14056 11.4318 7.87561 11.2365 7.68026C11.0411 7.48491 10.7762 7.37516 10.4999 7.37516ZM17.7916 0.0834961H3.20825C2.37945 0.0834961 1.58459 0.412736 0.998543 0.998787C0.412492 1.58484 0.083252 2.37969 0.083252 3.2085V13.6252C0.083252 14.454 0.412492 15.2488 0.998543 15.8349C1.58459 16.4209 2.37945 16.7502 3.20825 16.7502H15.2812L19.1353 20.6147C19.2327 20.7113 19.3481 20.7877 19.475 20.8395C19.6019 20.8913 19.7378 20.9176 19.8749 20.9168C20.0116 20.9203 20.1471 20.8918 20.2708 20.8335C20.461 20.7554 20.6238 20.6226 20.7388 20.4521C20.8537 20.2816 20.9156 20.0808 20.9166 19.8752V3.2085C20.9166 2.37969 20.5873 1.58484 20.0013 0.998787C19.4152 0.412736 18.6204 0.0834961 17.7916 0.0834961ZM18.8333 17.3647L16.4478 14.9689C16.3505 14.8724 16.2351 14.796 16.1082 14.7442C15.9812 14.6923 15.8453 14.666 15.7083 14.6668H3.20825C2.93198 14.6668 2.66703 14.5571 2.47168 14.3617C2.27633 14.1664 2.16659 13.9014 2.16659 13.6252V3.2085C2.16659 2.93223 2.27633 2.66728 2.47168 2.47193C2.66703 2.27658 2.93198 2.16683 3.20825 2.16683H17.7916C18.0679 2.16683 18.3328 2.27658 18.5282 2.47193C18.7235 2.66728 18.8333 2.93223 18.8333 3.2085V17.3647ZM6.33325 7.37516C6.12723 7.37516 5.92583 7.43626 5.75453 7.55071C5.58323 7.66517 5.44972 7.82786 5.37088 8.0182C5.29204 8.20854 5.27141 8.41798 5.3116 8.62005C5.35179 8.82211 5.451 9.00772 5.59668 9.1534C5.74236 9.29908 5.92797 9.39829 6.13003 9.43848C6.3321 9.47867 6.54154 9.45805 6.73188 9.3792C6.92222 9.30036 7.08491 9.16685 7.19937 8.99555C7.31383 8.82425 7.37492 8.62285 7.37492 8.41683C7.37492 8.14056 7.26517 7.87561 7.06982 7.68026C6.87447 7.48491 6.60952 7.37516 6.33325 7.37516ZM14.6666 7.37516C14.4606 7.37516 14.2592 7.43626 14.0879 7.55071C13.9166 7.66517 13.7831 7.82786 13.7042 8.0182C13.6254 8.20854 13.6047 8.41798 13.6449 8.62005C13.6851 8.82211 13.7843 9.00772 13.93 9.1534C14.0757 9.29908 14.2613 9.39829 14.4634 9.43848C14.6654 9.47867 14.8749 9.45805 15.0652 9.3792C15.2556 9.30036 15.4182 9.16685 15.5327 8.99555C15.6472 8.82425 15.7083 8.62285 15.7083 8.41683C15.7083 8.14056 15.5985 7.87561 15.4032 7.68026C15.2078 7.48491 14.9429 7.37516 14.6666 7.37516Z"
            fill="#1037A9"/>
        </svg>
      </button>
      <AdminPopUp id={"comment-screen"} modalOpen={cmtOpen} setModalOpen={setCmtOpen}
                  content={<CommentView comments={comments} cmtOpen={cmtOpen} setCmtOpen={setCmtOpen}/>}/>
    </>
  );
};

const CommentView = ({cmtOpen, setCmtOpen, comments}) => {
  return (
    <section className={"w-screen h-screen flex justify-center items-center"}>
      <div className="w-1/2 h-2/3 flex flex-col bg-white rounded-md">

        <section className={"flex p-4 border"}>
          <div className={"m-auto"}>
            User's Post
          </div>
          <button
            className={"transition duration-100 self-end w-fit text-white bg-[#4E4F50] rounded-[50%] p-2 hover:bg-opacity-90"}
            onClick={(e) => {
              e.stopPropagation();
              setCmtOpen(false)
            }}>
            <svg fill="currentColor" viewBox="0 0 24 24" width="1em"
                 className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1qx5ct2 xw4jnvo h-4 w-4">
              <path
                d="M18.707 5.293a1 1 0 0 0-1.414 0L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0 0-1.414z"></path>
            </svg>
          </button>
        </section>

        {/*cmt body*/}
        <section className={"h-full overflow-auto p-4"}>
          {/*{comments[0].body}*/}
          {comments?.map(cmt => {
            return (
              <CommentCard key={cmt.id} cmt={cmt}/>
            )
          })}
        </section>

        {/*cmt input*/}
        <section className="mt-auto flex justify-center items-center gap-2 p-4 border-t-2 border-grayFactory">
          <label htmlFor="file-input" className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
            </svg>
            <input id={"file-input"} className="hidden" type="file"/>
          </label>
          <input type="text" className="rounded-[20px] w-2/3 placeholder:text-sm p-1 px-4"
                 placeholder={"Speak your mind..."}/>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
          </button>
        </section>

      </div>
    </section>
  )
}
