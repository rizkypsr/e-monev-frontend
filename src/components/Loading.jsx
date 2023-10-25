import React from 'react';
import Loading from 'react-loading';

const ReactLoading = ({ color = '#069DD9' }) => (
  <div className="flex justify-center items-center">
    <Loading className="" type="bubbles" color={color} />
  </div>
);

export default ReactLoading;
