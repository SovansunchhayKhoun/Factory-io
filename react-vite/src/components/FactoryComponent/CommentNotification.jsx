import {Link} from "react-router-dom";
import {useCommentContext} from "../../context/Factory/CommentContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const CommentNotification = () => {
  const {comments} = useCommentContext();
  const {user} = useAuthContext();
    return (
        <>
          <div className={"flex flex-col gap-3"}>
            {comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id)?.map(cmt => {
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
                  {cmt?.replies?.filter(cmt => cmt?.replier_id === user?.id).map(cmt => {
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
  return (
    <Link to={`/project/${cmt?.project_id}`}>
      <div className={"hover:bg-gray-200 cursor-pointer transition duration-200 bg-white shadow-md px-4 py-2 flex items-center gap-2"}>
        <img className={"object-contain rounded-[50%] w-[56px] h-[56px] border"} src={`https://robohash.org/${cmt?.user_cmt?.username}`} alt=""/>
        <div>
          <p className={"flex gap-2 font-semibold"}>
            {cmt?.user_cmt?.username}
            <span className={"font-normal text-grayFactory"}>{cmt?.comment_indicator === 1 ? 'commented on your project' : 'replied to your comment'}</span>
          </p>
          <p className={"font-normal text-sm"}>{cmt?.body}</p>
          <p className={"text-grayFactory text-sm"}>{new Date(cmt?.comment_time).toLocaleTimeString().slice(0,5) + new Date(cmt?.comment_time).toLocaleTimeString().slice(8)}</p>
        </div>
        {cmt?.comment_indicator !== 0 && <span className="bg-cyan-600 ml-6 w-2 h-2 aspect-square rounded-[50%]"></span>}
      </div>
    </Link>
  )
}
