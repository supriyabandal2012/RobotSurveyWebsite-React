import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LottieAnimation from '../LottieAnimation';

const PreSurvey = ({ onStartSurvey }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [familiarityWithRobots, setFamiliarityWithRobots] = useState('');
  const [preferRobotsOverHumans, setPreferRobotsOverHumans] = useState('');
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountryList(countryNames);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleStartSurvey = async () => {
    if (age && gender && country && familiarityWithRobots && preferRobotsOverHumans !== '') {
      if (age === 'yes') {
        const preSurveyData = {
          age,
          gender,
          country,
          familiarityWithRobots,
          preferRobotsOverHumans,
        };

        try {
          const response = await axios.post('https://robotsurveybackend.onrender.com/api/submit-pre-survey', preSurveyData);

          if (response.status === 200) {
            console.log('Pre-survey data submitted successfully!');
            onStartSurvey(preSurveyData);
            navigate('/survey');
          } else {
            console.error('Failed to submit pre-survey data');
          }
        } catch (error) {
          console.error('Error submitting pre-survey data:', error);
        }
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
