import React, { useState } from 'react';
import axios from 'axios';
import { Stethoscope, Wind, Thermometer, Activity, Heart, AlertCircle } from 'lucide-react';

const PredictionForm = () => {
  const [textSymptoms, setTextSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [spo2, setSpo2] = useState<number | string>('');
  const [breathingDifficulty, setBreathingDifficulty] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const symptoms = [
    { name: 'Shortness of Breath', icon: <Wind className="w-5 h-5" /> },
    { name: 'Chest Pain', icon: <Heart className="w-5 h-5" /> },
    { name: 'Coughing', icon: <AlertCircle className="w-5 h-5" /> },
    { name: 'Fever', icon: <Thermometer className="w-5 h-5" /> },
    { name: 'Fatigue', icon: <Activity className="w-5 h-5" /> },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5002/predict', {
        textSymptoms,
        selectedSymptoms,
        spo2,
        breathingDifficulty,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Stethoscope className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lung Disease Predictor</h1>
            <p className="text-gray-600">Enter your symptoms for an AI-powered preliminary assessment</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Symptoms Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe your symptoms in detail
                </label>
                <textarea
                  value={textSymptoms}
                  onChange={(e) => setTextSymptoms(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe any additional symptoms or concerns..."
                />
              </div>

              {/* Symptom Checkboxes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Common Symptoms
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {symptoms.map(({ name, icon }) => (
                    <div
                      key={name}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSymptoms.includes(name)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => {
                        setSelectedSymptoms(prev =>
                          prev.includes(name)
                            ? prev.filter(s => s !== name)
                            : [...prev, name]
                        );
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${
                          selectedSymptoms.includes(name) ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                          {icon}
                        </div>
                        <span className={`font-medium ${
                          selectedSymptoms.includes(name) ? 'text-blue-600' : 'text-gray-700'
                        }`}>
                          {name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SpO2 Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Oxygen Level (SpO2)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="95"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* Breathing Difficulty Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Are you experiencing difficulty breathing?
                </label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBreathingDifficulty(option === 'Yes')}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                        (option === 'Yes' ? breathingDifficulty : !breathingDifficulty)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Get Prediction'}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Prediction Result */}
            {prediction && !error && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Result</h3>
                <p className="text-gray-700">{prediction}</p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>This tool provides preliminary assessments only and should not replace professional medical advice.</p>
            <p>If you're experiencing severe symptoms, please seek immediate medical attention.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;