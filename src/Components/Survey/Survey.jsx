import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LottieAnimation from '../LottieAnimation';
import questionSets from './QuestionSets';

const Survey = () => {
  const [feedback, setFeedback] = useState({});
  const [currentSet, setCurrentSet] = useState(0);
  const [submittedResponses, setSubmittedResponses] = useState(Array.from({ length: questionSets.length + 1 }, () => []));
  const navigate = useNavigate();

  const setHeadings = {
    0: 'Welcome',
    1: 'Primary Reason for Visit',
    2: 'Reservation Inquiry',
    3: 'Follow-up 1',
    4: 'Follow-up 2',
    5: 'End 🤩', // Added a new set
  };

  const initializeRankings = useCallback(() => {
    // You can remove this function if not needed
  }, []);

  useEffect(() => {
    const initialize = () => {
      initializeRankings();
      const initialResponses = {};
      Object.keys(questionSets[currentSet]).forEach((question, index) => {
        initialResponses[`q${index + 1}`] = ''; // Initialize responses as blank
      });
      setFeedback(initialResponses);
    };

    initialize();
  }, [initializeRankings, currentSet]);

  const handleFeedbackChange = (questionIndex, value) => {
    const questionKey = `q${questionIndex + 1}`;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionKey]: value,
    }));
  };

  const logResponses = () => {
    const formattedResponses = questionSets[currentSet].map((question, index) => ({
      set: currentSet,
      question,
      response: feedback[`q${index + 1}`],
    }));

    console.log(`Survey data for Set ${currentSet}:`, formattedResponses);

    setSubmittedResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[currentSet] = formattedResponses;
      return newResponses;
    });
  };

  const handleSubmitSurvey = async () => {
    try {
      // Log responses for the last set
      logResponses();

      // Flatten the submittedResponses array for submission
      const allResponses = submittedResponses.flat();

      console.log('All Survey data:', allResponses);

      // Submit the survey data to the backend
      const response = await axios.post('https://robotsurveybackend.onrender.com/api/submit-survey', {
        submittedResponses: allResponses,
      });

      if (response.status === 200) {
        console.log('All Survey data submitted successfully!');
        navigate('/post-survey');
      } else {
        throw new Error('Failed to submit all survey data');
      }
    } catch (error) {
      console.error('Error submitting all survey data:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handlePrevSet = () => {
    logResponses(); // Log responses before moving to the previous set

    setCurrentSet((prevSet) => Math.max(prevSet - 1, 0));
  };

  const handleNextSet = () => {
    // Check if any question in the current set is unanswered
    const isAnyQuestionUnanswered = Object.keys(feedback).some((key) => feedback[key] === '');

    if (isAnyQuestionUnanswered) {
      alert('Please answer all questions before moving to the next set.');
      return;
    }

    logResponses(); // Log responses before moving to the next set

    setCurrentSet((prevSet) => Math.min(prevSet + 1, Object.keys(questionSets).length - 1));
  };

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <h1>I am Rob, your Receptionist for today</h1>
      <LottieAnimation />

      <div>
        <h2>Questions: {setHeadings[currentSet]}</h2>
        {questionSets[currentSet].map((question, index) => (
          <div key={index}>
            <p style={{ fontSize: '24px' }}>
              <strong>{question}</strong>
            </p>
            <div>
              <p>
                How Polite do you find this Question:&nbsp;
                <select
                  value={feedback[`q${index + 1}`]}
                  onChange={(e) => handleFeedbackChange(index, e.target.value)}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </div>
        ))}
        <div>
          <button onClick={handlePrevSet} disabled={currentSet === 0}>
            Previous Set
          </button>
          <span style={{ margin: '0 10px' }}></span>
          <button
            onClick={currentSet === Object.keys(questionSets).length - 1 ? handleSubmitSurvey : handleNextSet}
          >
            {currentSet === Object.keys(questionSets).length - 1 ? 'Submit Survey' : 'Next Set'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;