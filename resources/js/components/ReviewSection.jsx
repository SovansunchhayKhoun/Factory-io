import React, {useState} from "react";
import {ImageExpand} from "./ImageExpand.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const ReviewSection = (props) => {
  const {user, created_at, title, description, image} = props.review;
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div>
            <img className="max-w-[50px] rounded-3xl shadow-xl" src={`https://robohash.org/${user[0]?.username}`}/>
          </div>
          <div>
            <div className="text-blackFactory font-semibold">
              {user[0].username}
            </div>
            <div className="text-slate-400">
              {created_at.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className="mt-2 ml-16 ">
          <h1 className="font-bold text-xl text-blackFactory">{title}</h1>
          <p className="font-semibold text-blackFactory">{description}</p>

          {image && (
            <button onClick={(e) => {
              e.stopPropagation();
              setOpen(!open)
            }}>
              <img alt={title} className="w-[150px] mb-5 mt-4" src={`${imgUrl}/${image}`}/>
            </button>
          )}
          <ImageExpand imgSrc={`${imgUrl}/${image}`} open={open} setOpen={setOpen}/>
        </div>
      </div>
    </div>
  )
}
