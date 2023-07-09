import React from "react";
import {useRouteError} from "react-router-dom";

export const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <div>
        Dang! View the console for more info
      </div>
    </div>
  );
};
