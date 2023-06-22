import React from "react";


export const ReviewSection =  (props) =>{
    const {user,created_at,title,description,image} = props.review
    return (
      <div>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <div>
              <img className="max-w-[50px] rounded-3xl shadow-xl" src={`https://robohash.org/${user[0].username}`} />
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
            {
              image &&
                <img className="w-[150px] mb-5 mt-4" src={`http://127.0.0.1:8000/${image}`}/>
            }
          </div>
        </div>
      </div>
    )
}
