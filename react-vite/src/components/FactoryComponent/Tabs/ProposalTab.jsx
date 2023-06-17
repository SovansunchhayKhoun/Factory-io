import React from "react";
import {useProjectContext} from "../../../context/Factory/ProjectContext.jsx";

export const ProposalTab = () => {
  const {
    errors,
    setProjectValues,
    projectValues,
  } = useProjectContext();
  return (
    <>
      <div className="flex flex-col items-start">
        <label htmlFor="proposal"></label>
        <textarea value={projectValues.proposal}
                  placeholder={"Write/Link any relevant documentation or description regarding your proposed project"}
                  onChange={event => setProjectValues({...projectValues, proposal: event.target.value})}
                  id="proposal" className="w-full rounded-md" rows="5"></textarea>
      </div>
    </>
  );
};
