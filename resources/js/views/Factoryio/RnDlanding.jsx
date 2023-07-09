import React from "react";
import {PostCard} from "../../components/PostCard.jsx";
import {PostDetail} from "../../components/PostDetail.jsx";

export const RnDLanding = () => {
    return (
        <>
    <main>
      <div className="flex justify-center font-bold text-2xl" >
        Research & Development
      </div>
      <div>
        <span className="flex justify-start mt-5">
          Feature Project
        </span>
      </div>
      <div>
        <PostCard></PostCard>
      </div>
      <div className="flex justify-center">
        <PostDetail></PostDetail>
      </div>
    </main>
        </>
    );
};
