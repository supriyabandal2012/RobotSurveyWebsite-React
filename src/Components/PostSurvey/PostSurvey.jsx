import React, { useState } from 'react';
import LottieAnimation from '../LottieAnimation';

const PostSurvey = ({ onSubmitSurvey }) => {
  const [satisfactionRating, setSatisfactionRating] = useState('');
  const [findRobotsInteresting, setFindRobotsInteresting] = useState('');
  const [preferRobotsOverHumans, setPreferRobotsOverHumans] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const handleSurveySubmit = () => {
    // Validate the input if needed
    if (satisfactionRating && findRobotsInteresting && preferRobotsOverHumans !== '') {
      // Pass the post-survey data to the parent component
      onSubmitSurvey({
        satisfactionRating,
        findRobotsInteresting,
        preferRobotsOverHumans,
        additionalComments,
      });
    } else {
      alert('Please answer all the questions before submitting the survey.');
    }
  };

  return (
    <div style={{ textAlign: 'left', justifyContent: 'center', border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <LottieAnimation />
      <h2>Post-Survey Questions</h2>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>
        <label>
          How satisfied were you with the virtual robot interaction? (1-5)
          <select
            value={satisfactionRating}
            onChange={(e) => setSatisfactionRating(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">1 (Not satisfied at all)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 (Very satisfied)</option>
          </select>
        </label>
      </div>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>
        <label>
          Did you find robots interesting at check-in/check-out? (Yes/No)
          <select
            value={findRobotsInteresting}
            onChange={(e) => setFindRobotsInteresting(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>
        <label>
          Would you prefer robots over humans for check-in/check-out? (Yes/No)
          <select
            value={preferRobotsOverHumans}
            onChange={(e) => setPreferRobotsOverHumans(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>
      <div style={{ fontSize: '20px', marginBottom: '20px' }}>
        <label>
          Additional comments (if any):<br/>
          <textarea
            style={{ marginTop: '10px' }} // Adjusted margin-top for additional spacing
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSurveySubmit}>Submit Survey</button>
    </div>
  );
};

export default PostSurvey;
