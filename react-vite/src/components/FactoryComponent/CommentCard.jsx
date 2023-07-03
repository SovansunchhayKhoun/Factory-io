import {useAuthContext} from "../../context/AuthContext.jsx";

export const CommentCard = () => {
  const {user} = useAuthContext() // for view
  return (
    <section className="flex items-center gap-2 w-full p-4">
      <div className="flex items-center">
        <img src="https://robohash.org/JustChhayXP" className={"w-[48px] border rounded-[50%]"} alt=""/>
      </div>
      <div className={"w-fit flex flex-col text-sm px-4 py-4 bg-whiteFactory gap-1 rounded-3xl"}>
        <p className="font-semibold">{user?.username} <span className={"text-redBase"}>&#x2022;</span> <span
          className="font-normal text-blueActive">follow</span></p>
        <p>This is a test comment</p>
      </div>
      <div className={"text-right text-grayFactory text-sm"}>
        <button>Reply</button>
      </div>
    </section>
  );
};
