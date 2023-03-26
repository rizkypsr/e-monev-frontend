import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function ErrorPage({ errorMessage, showBackButton }) {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-2xl font-semibold leading-loose">Ooops!</h1>
        <div className="mt-3 leading-loose">
          <p>{errorMessage} </p>
          <p>Silahkan coba lagi nanti</p>
        </div>
        {showBackButton && (
          <Link to="../">
            <Button
              className="mt-3"
              background="bg-primary"
              textColor="text-white"
            >
              Kembali
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
