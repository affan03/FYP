import React, { useState } from 'react';

const ResultCard = ({ result, onClose }) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-blue-800 shadow-xl rounded-lg p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Skin Analysis Result</h2>
          {/* <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}  // Handle the close functionality here
          >
            ✖
          </button> */}
        </div>
        <div>
          <p className="mb-4 text-white"><strong>Skin Disease:</strong> {result['Skin disease']}</p>
          {result['Acne type'] && (
            <>
              <p className='text-white'><strong>Acne Type:</strong> {result['Acne type']}</p>
              <p className='text-white'><strong>Acne Grade:</strong> {result['Acne grade']}</p>
              <p className='text-white'><strong>Acne Severity:</strong> {result['Acne severity']}</p>
            </>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-white text-black py-2 px-6 rounded-lg hover:bg-slate-200"
            onClick={onClose}  // Close the modal when this button is clicked
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
