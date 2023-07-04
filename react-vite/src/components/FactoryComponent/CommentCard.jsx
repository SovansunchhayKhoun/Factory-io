import {useAuthContext} from "../../context/AuthContext.jsx";

export const CommentCard = ({cmt}) => {
  const {user} = useAuthContext() // for view
  const {replies} = cmt;
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className={"border-l-2 flex items-center gap-2 px-2 w-full"}>
        <div className="flex items-center">
          <img src="https://robohash.org/JustChhayXP" className={"w-[48px] border rounded-[50%]"} alt=""/>
        </div>
        <div className={"w-fit flex flex-col text-sm px-4 py-4 bg-whiteFactory gap-1 rounded-3xl"}>
          <p className="font-semibold">{user?.username} <span className={"text-redBase"}>&#x2022;</span> <span
            className="font-normal text-blueActive">follow</span></p>
          <p>{cmt.body}</p>
        </div>
        <div className={"text-right text-grayFactory text-sm"}>
          <button>Reply</button>

          {/*{replies?.map(reply => <div>{reply.body}</div>)}*/}
        </div>
      </div>
      <div className={"px-8"}>
        {replies && replies?.map(reply => {
          return (
            <CommentCard key={reply.id} cmt={reply}/>
          )
        })}
      </div>
    </section>
  );
};
