import {Slide} from "@mui/material";
import React from "react";

export const PrototypeView = ({prototype}) => {
  return (
    <>
      <Slide direction={"up"} in={true} unmountOnExit mountOnEnter>
        <section className={'flex flex-col'}>
          <div className="flex gap-x-4 lg:flex-row flex-col border border-blackFactory  rounded-md gap-3 p-4">
            <div className="flex flex-1 bg-grayFactory shadow-blueActive shadow-sm justify-center">
              {prototype.image && (
                <div className="relative">
                  <button
                    className={`bg-blackFactory p-1 text-whiteFactory absolute top-1 right-1 transition duration-200 rounded-[50%] hover:bg-blackFactory/50`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M12.475 4.71768L9.2875 1.56768L10.3375 0.517676C10.625 0.230176 10.9782 0.0864258 11.3973 0.0864258C11.8162 0.0864258 12.1692 0.230176 12.4562 0.517676L13.5062 1.56768C13.7937 1.85518 13.9437 2.20218 13.9562 2.60868C13.9687 3.01518 13.8312 3.36193 13.5437 3.64893L12.475 4.71768ZM11.3875 5.82393L3.4375 13.7739H0.25V10.5864L8.2 2.63643L11.3875 5.82393Z"
                        fill={"#fff"}/>
                    </svg>
                  </button>
                  <img loading="lazy" className="object-contain max-h-[450px]"
                       src={URL.createObjectURL(prototype.image)} alt=""/>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="price">Price: ${prototype.price}</label>
              </div>
              <div className={"flex flex-col gap-1"}>
                <label htmlFor="description">Description</label>
                <div>{prototype.description}</div>
                {/*<textarea value={prjPrototypeValues.description} onChange={e => setPrjPrototypeValues({*/}
                {/*  ...prjPrototypeValues,*/}
                {/*  description: e.target.value*/}
                {/*})}*/}
                {/*          className="rounded-md" id="description" cols="30" rows="10"></textarea>*/}
              </div>
              {/*<button onClick={() => submitPrototype()}*/}
              {/*        className="w-full rounded-md border-2 bg-[#D9D9D9] border-blueBase py-2">Submit*/}
              {/*</button>*/}
            </div>
          </div>
        </section>
      </Slide>
    </>
  );
};
