import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LottieAnimation from '../LottieAnimation';

const PreSurvey = ({ onStartSurvey }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [familiarityWithRobots, setFamiliarityWithRobots] = useState('');
  const [preferRobotsOverHumans, setPreferRobotsOverHumans] = useState('');
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    // Fetch the list of countries from the REST Countries API
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // Extract country names from the response
        const countryNames = data.map((country) => country.name.common);
        setCountryList(countryNames);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []); // Run this effect only once when the component mounts

  const handleStartSurvey = () => {
    // Validate the input if needed
    if (age && gender && country && familiarityWithRobots && preferRobotsOverHumans !== '') {
      // Check if the age is 18 or above
      if (age === 'yes') {
        // Pass the pre-survey data to the parent component (App.js)
        onStartSurvey({
          age,
          gender,
          country,
          familiarityWithRobots,
          preferRobotsOverHumans,
        });
        // Redirect to the survey page
        navigate('/survey'); // Use the navigate function to redirect to /survey
      } else {
        alert('You must be 18 years or older to participate in the survey.');
      }
    } else {
      alert('Please answer all the questions before starting the survey.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
         <LottieAnimation />
      <h2>Pre-Survey Questions</h2>
      <label>
        Are you above 18 years old?
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <label>
        What is your gender?
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        What is your country of residency?
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select</option>
          {countryList.map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        How familiar are you with robots? (1-5)
        <input
          type="number"
          value={familiarityWithRobots}
          onChange={(e) => setFamiliarityWithRobots(e.target.value)}
        />
      </label>
      <br />
      <label>
        Would you prefer robots over humans for check-in/check-out? (yes/no)
        <select
          value={preferRobotsOverHumans}
          onChange={(e) => setPreferRobotsOverHumans(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <button onClick={handleStartSurvey}>Start Survey</button>
    </div>
  );
};

export default PreSurvey;
