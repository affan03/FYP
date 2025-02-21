// UploadPic.jsx
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

const UploadPic = () => {
  const { state } = useLocation();
  const { imageSrc } = state || {};
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const handleSend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/success'); // Navigate to success page or desired route
    }, 3000);
  };

  return (
    <>
      <div>
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            className="relative top-0 left-0"
          />
        )}
        <div className="mt-4 flex space-x-4 items-center">
          <button
            className="px-9 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-600 absolute bottom-12 right-96"
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
          </button>
          <button
            className="px-9 py-3 bg-black text-white rounded-md hover:bg-gray-600 absolute bottom-12 left-96"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </button>
        </div>
        {isLoading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
            <CircularProgress size={60} color="inherit" />
          </div>
        )}
      </div>
    </>
  );
};

export default UploadPic;
