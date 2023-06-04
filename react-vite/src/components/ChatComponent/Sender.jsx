import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {ImageExpand} from "../ImageExpand.jsx";
import {useContext, useState} from "react";
import ChatContext from "../../context/ChatContext.jsx";

export const Sender = (props) => {
  const {getLatestMessage} = useContext(ChatContext);
  const {messageContent, time, image, setModalOpen} = props;
  const {user} = useAuthContext();
  const [handleExpand, setHandleExpand] = useState(false);

  const timePrefix = new Date(time).getHours();

  return (
    <>
      {/*sender*/}
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div
            className={`${image ? 'p-0' : 'p-3'} ${messageContent ? 'bg-blue-600' : 'bg-transparent'} text-white rounded-l-lg rounded-br-lg`}>
            <p className={`${image && 'p-3'} text-sm`}>{messageContent}</p>
            {image && (
              <img onClick={(e) => {
                e.stopPropagation();
                setHandleExpand(true)
              }} alt="" className="cursor-pointer border md:max-w-[250px] max-w-[156px] object-contain bg-white"
                   src={`http://127.0.0.1:8000/${image}`}/>
            )}
            <ImageExpand open={handleExpand} setOpen={setHandleExpand} imgSrc={`http://127.0.0.1:8000/${image}`}/>
          </div>
          <span className="text-xs text-gray-500 leading-none">{time.slice(10).slice(0,6)}{timePrefix >= 12 ? ' PM' : ' AM'}</span>
        </div>
        {/*pfp*/}
        <Link to={`/user/${user.id}`} onClick={e => {
          e.stopPropagation();
          setModalOpen(false)
        }}
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full border">
            <img src={`https://robohash.org/${user.username}`} alt=""/>
          </div>
        </Link>
        {/*pfp*/}
      </div>
      {/*sender*/}
    </>
  );
};
