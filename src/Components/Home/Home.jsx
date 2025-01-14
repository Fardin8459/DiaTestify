import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const initialFormData = {
    gender: '',
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [isDiabetic, setIsDiabetic] = useState(null);
  const [modelAccuracy, setModelAccuracy] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResult(null);
    setIsDiabetic(null);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = (data) => {
    const errors = [];

    if (!data.gender) {
      errors.push('Please select a gender.');
    }
    if (data.gender === 'female' && (!data.pregnancies || data.pregnancies < 0 || data.pregnancies > 15)) {
      errors.push('Pregnancies must be between 0 and 15.');
    }
    if (!data.glucose || data.glucose < 70 || data.glucose > 200) {
      errors.push('Glucose must be between 70 and 200.');
    }
    if (!data.bloodPressure || data.bloodPressure < 50 || data.bloodPressure > 120) {
      errors.push('Blood Pressure must be between 50 and 120.');
    }
    if (!data.skinThickness || data.skinThickness < 10 || data.skinThickness > 99) {
      errors.push('Skin Thickness must be between 10 and 99.');
    }
    if (!data.insulin || data.insulin < 16 || data.insulin > 1000) {
      errors.push('Insulin must be between 16 and 1000.');
    }
    if (!data.bmi || data.bmi < 10.0 || data.bmi > 60.0) {
      errors.push('BMI must be between 10.0 and 60.0.');
    }
    if (!data.diabetesPedigreeFunction || data.diabetesPedigreeFunction < 0.0 || data.diabetesPedigreeFunction > 2.5) {
      errors.push('Diabetes Pedigree Function must be between 0.0 and 2.5.');
    }
    if (!data.age || data.age < 20 || data.age > 100) {
      errors.push('Age must be between 20 and 100.');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data.result);
      setIsDiabetic(response.data.result.includes('Oops'));
    } catch (error) {
      console.error('Error during prediction:', error);
      setError(error.response?.data?.error || 'An error occurred.');
      setResult(null);
      setIsDiabetic(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setIsDiabetic(null);
    setError(null);
  };

  const fetchModelAccuracy = async () => {
    try {
      const response = await axios.get('http://localhost:5000/model-accuracy');
      console.log("Model Accuracy Response:", response.data);
      setModelAccuracy(response.data);
    } catch (error) {
      console.error('Error fetching model accuracy:', error);
    }
  };

  useEffect(() => {
    fetchModelAccuracy();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-gray-50 to-gray-100 shadow-xl rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Gender:</label>
          <div className="flex space-x-8">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {formData.gender === 'female' && (
          <div>
            <label className="block font-medium text-gray-700">Pregnancies:</label>
            <input
              type="number"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleChange}
              min="0"
              max="15"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700">Glucose:</label>
          <input
            type="number"
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            min="70"
            max="200"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Blood Pressure:</label>
          <input
            type="number"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            min="50"
            max="120"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Skin Thickness:</label>
          <input
            type="number"
            name="skinThickness"
            value={formData.skinThickness}
            onChange={handleChange}
            min="10"
            max="99"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Insulin:</label>
          <input
            type="number"
            name="insulin"
            value={formData.insulin}
            onChange={handleChange}
            min="16"
            max="1000"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">BMI:</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            min="10.0"
            max="60.0"
            step="0.1"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Diabetes Pedigree Function:</label>
          <input
            type="number"
            name="diabetesPedigreeFunction"
            value={formData.diabetesPedigreeFunction}
            onChange={handleChange}
            min="0.0"
            max="2.50"
            step="0.001"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="20"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Predict
          </button>
          <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          {error.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}

      {result && (
        <div
          className={`mt-6 p-6 text-center font-semibold text-white rounded-md shadow ${
            isDiabetic ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          <p>{isDiabetic ? 'You are at risk of diabetes.' : 'No diabetes detected.'}</p>
        </div>
      )}

      {modelAccuracy && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Model Accuracy</h3>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-blue-800">Accuracy:</span> {modelAccuracy.accuracy.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-blue-800">Cross-validation Scores:</span>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {modelAccuracy.cross_validation_scores.map((score, index) => (
                <li key={index}>Fold {index + 1}: {score.toFixed(2)}%</li>
              ))}
            </ul>
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-blue-800">Classification Report:</h4>
            <pre className="bg-blue-200 text-gray-700 p-4 rounded-lg mt-2 overflow-auto whitespace-pre-wrap">
              {modelAccuracy.classification_report}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
