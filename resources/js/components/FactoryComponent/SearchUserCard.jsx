import React from "react";

export const SearchUserCard = ({user}) => {
  const fullName = user?.firstName + ' ' + user?.lastName
    return (
      <div className={`px-8 py-4 rounded-md shadow-lg flex justify-start items-center gap-x-6 w-full`}>
        <div className={`shadow-blackFactory w-[100px] h-[100px] border border-slate-400 rounded-[50%]`}>
          <img src={`https://robohash.org/${user?.username}`} alt=""/>
        </div>
        <div className={`flex items-start justify-between w-full`}>
          <div className={`flex flex-col justify-start items-start`}>
            <p className={`font-semibold text-blackFactory text-2xl`}>{fullName}</p>
            <p className={`text-sm text-slate-600`}>@{user?.username}</p>
            <p className={`text-sm text-slate-600`}>100 Follower 100 Following</p>
            <p className={`text-sm text-slate-600`}>{user?.bio}</p>
            <p className={`text-sm text-slate-600`}>{user?.address}</p>
          </div>
          <div className={`cursor-pointer text-lg font-semibold text-blue-600`}>Follow</div>
        </div>
      </div>
    )
}
