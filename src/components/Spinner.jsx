import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-spin text-4xl">
        <FaSpinner />
      </div>
    </div>
  );
}

export default Spinner;
