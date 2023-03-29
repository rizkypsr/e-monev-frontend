import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Development() {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-2xl font-semibold leading-loose">Ooops!</h1>
        <div className="mt-3 leading-loose text-lg">
          <p>Fitur Dalam Tahap Pengembangan</p>
        </div>
        <Link to="../">
          <Button className="mt-3" background="bg-primary" textColor="text-white">
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Development;
