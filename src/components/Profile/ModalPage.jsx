import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import scan from '../../images/scan.svg';
import scan2 from '../../images/scan2.svg';
import ResultCard from './ResultCard'; // Ensure this import matches the location of the ResultCard component

const ModalPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the base URL from environment variable and append /predict/ endpoint
  const aiModelUrl = `${import.meta.env.VITE_AI_MODEL_URL}/predict/`;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Start loading spinner
      const reader = new FileReader();
      reader.onload = async () => {
        setSelectedImage(reader.result); // Preview image on the client-side
        const formData = new FormData();
        formData.append('file', file); // Append the file

        try {
          const response = await axios.post(aiModelUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Auth token for secured endpoints
            }
          });
          setAnalysisResult(response.data);
          setIsModalOpen(true); // Update state with the response data
          console.log("Analysis Result:", response.data); // Log the result to the console for debugging
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image: ' + error.message); // Alert with specific error message
        } finally {
          setLoading(false); // Stop loading spinner after processing is done
        }
      };
      reader.readAsDataURL(file); // This is used for client-side image preview
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[84vh] rounded-lg p-8 flex flex-col mt-12">
        <div className="absolute bg-blue-800 h-[85vh] rounded-lg w-1/4 bottom-7 right-44">
          <ul className="list-disc list-inside text-white font-extralight mt-60 ml-4 text-lg px-4">
            <li>Take the photo about 4 inches away from the problem area.</li>
            <li>Center your symptom in the photo.</li>
            <li>Make sure there is good lighting.</li>
            <li>Ensure your photo isn’t blurry.</li>
          </ul>
        </div>
        <div className="w-full flex justify-end">
          <button className="text-red-500 z-50" onClick={() => navigate(-1)}>
            ✖
          </button>
        </div>
        <div className="flex justify-start">
          <h1 className="text-4xl font-bold ml-48 bottom-12">How to take a photo</h1>
          <div className="grid grid-cols-2 gap-16 absolute right-96 bottom-32 mx-80">
            <img src={scan} alt="" className="w-52" />
            <CheckCircleIcon className="w-44 h-44 absolute text-black right-48 -top-6" sx={{ fontSize: 60 }} />
            <img src={scan2} alt="" className="w-52" />
            <CancelIcon className="w-44 h-44 absolute text-black -left-12 -top-6" sx={{ fontSize: 60 }} />
          </div>
        </div>
        <button
          className="mt-96 ml-52 relative py-3 w-72 bg-blue-800 text-white rounded-full top-12"
          onClick={handleClick}
        >
          Snap a photo
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Show the loading spinner while processing */}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
          </div>
        )}

        {/* Conditionally render the ResultCard if there is analysis data */}
        {isModalOpen && analysisResult && <ResultCard result={analysisResult} onClose={handleCloseModal}/>}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ModalPage;
