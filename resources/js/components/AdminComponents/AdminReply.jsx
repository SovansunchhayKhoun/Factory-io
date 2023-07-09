import React, {useState} from "react";
import {ImageExpand} from "../ImageExpand.jsx";

export const AdminReply = ({msg}) => {
  const [handleExpand, setHandleExpand] = useState(false);
  const timePrefix = new Date(msg?.time_sent).getHours();
  return (
    <>
      <li key={msg?.id} className="flex items-center gap-x-2 justify-start">
        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
          <span className="block">{msg?.msg_content}</span>
          <span>
            {msg?.image && (
              <>
                <img alt=""
                     onClick={(e) => {
                       e.stopPropagation();
                       setHandleExpand(true)
                     }} className="max-w-[250px] cursor-pointer" src={`http://127.0.0.1:8000/${msg?.image}`}/>
              </>
            )}
            <ImageExpand open={handleExpand} setOpen={setHandleExpand} imgSrc={`http://127.0.0.1:8000/${msg?.image}`}/>
          </span>
          <span
            className={`${msg?.image ? 'text-xs block text-grayFactory' : 'hidden'}`}>{msg?.time_sent.slice(10).slice(0, 6) + `${timePrefix >= 12 ? ' PM' : ' AM'}`}</span>
        </div>
        <span
          className={`${msg?.image && 'hidden'} text-xs block text-grayFactory`}>{msg?.time_sent.slice(10).slice(0, 6) + `${timePrefix >= 12 ? ' PM' : ' AM'}`}</span>
      </li>
    </>
  );
};
