import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Button from "../components/Button";

function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-2xl font-semibold leading-loose">Ooops!</h1>
        <p className="mt-3 leading-loose">
          Terjadi kesalahan pada server. Silahkan coba lagi nanti
        </p>
        <Link to="../">
          <Button
            className="mt-3"
            background="bg-primary"
            textColor="text-white">
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
