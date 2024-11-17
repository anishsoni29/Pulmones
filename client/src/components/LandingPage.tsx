import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Lung Disease Predictor</h1>
      <p className="text-gray-600 mb-8 text-center">
        Enter your symptoms manually or choose from the provided options.
      </p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate('/predict')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
