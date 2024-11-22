import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const initialFormData = {
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
  const [modelAccuracy, setModelAccuracy] = useState(null); // State to store model accuracy
  const [error, setError] = useState(null); // Error state for invalid inputs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = (data) => {
    const errors = [];
    
    if (!data.pregnancies || data.pregnancies < 0 || data.pregnancies > 15) {
      errors.push('Pregnancies must be between 0 and 15.');
    }
    if (!data.glucose || data.glucose < 70 || data.glucose > 200) {
      errors.push('Glucose must be between 70 and 200.');
    }
    if (!data.bloodPressure || data.bloodPressure < 60 || data.bloodPressure > 120) {
      errors.push('Blood Pressure must be between 60 and 120.');
    }
    if (!data.skinThickness || data.skinThickness < 10 || data.skinThickness > 99) {
      errors.push('Skin Thickness must be between 10 and 99.');
    }
    if (!data.insulin || data.insulin < 16 || data.insulin > 300) {
      errors.push('Insulin must be between 16 and 300.');
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
  
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      console.log('Backend response:', response);
  
      if (response.data.errors) {
        const errorMessages = response.data.errors.map((error) => (
          <div key={error.field} className="error-message">
            <strong>{error.field}:</strong> {error.error} (Provided: {error.provided_value})
          </div>
        ));
        setError(errorMessages);
        setResult(null);
        setIsDiabetic(null);
      } else {
        setResult(response.data.result);
        setIsDiabetic(response.data.result.includes('Oops'));
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setError(error.response?.data?.error || 'An error occurred.');
      setResult(null);
      setIsDiabetic(null);
    }
  };
  

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setIsDiabetic(null);
    setError(null); // Reset error
  };

  const fetchModelAccuracy = async () => {
    try {
      const response = await axios.get('http://localhost:5000/model-accuracy');
      setModelAccuracy(response.data.model_accuracies);
    } catch (error) {
      console.error('Error fetching model accuracy:', error);
    }
  };

  return (
    <div className="predict-form-wrapper">
      <form onSubmit={handleSubmit} className="predict-form-body">
        {Object.keys(initialFormData).map((field) => (
          <div key={field} className="predict-form-group">
            <label htmlFor={field} className="predict-form-label">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
            </label>
            <input
              // type={field === 'bmi' || field === 'diabetesPedigreeFunction' ? 'number' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="predict-form-input"
              placeholder={`Enter ${field}...`}
              required
            />
          </div>
        ))}
        <div className="predict-form-actions">
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
        </div>
      </form>

      {result && !error && (
        <div className={`result-box ${isDiabetic ? 'diabetic' : 'non-diabetic'}`}>
          {result}
        </div>
      )}

{error && (
      <div className="error-list">
        <h4>Error:</h4>
        <ul>
          {Array.isArray(error) ? (
            error.map((err, index) => <li key={index}>{err}</li>)
          ) : (
            <li>{error}</li>
          )}
        </ul>
      </div>
    )}

      <div className="accuracy-section">
        <button type="button" className="btn btn-accuracy" onClick={fetchModelAccuracy}>
          Show Model Accuracy
        </button>
        {modelAccuracy && (
          <div className="accuracy-box">
            <h3>Model Accuracies:</h3>
            <ul>
              {Object.entries(modelAccuracy).map(([model, accuracy]) => (
                <li key={model}>{model}: {accuracy.toFixed(2)}%</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
