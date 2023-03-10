import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage404() {
  const error = useRouteError();

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-2xl font-semibold leading-loose">
          Ooops!
        </h1>
        <p className="mt-3 leading-loose">
          Nampaknya apa yang kamu cari tidak tersedia
        </p>
        <p>
          <i>Error: {error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage404;
