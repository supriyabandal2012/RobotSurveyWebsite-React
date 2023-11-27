import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LottieAnimation from '../LottieAnimation';

const SurveyComponent = () => {
  const [feedback, setFeedback] = useState({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
    q5: 1,
  });

  const [currentSet, setCurrentSet] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const questionSets = {
    0: [
      "Hello! How can I assist you today?",
      "Welcome! Need help?",
      "Greetings! How can I be of service?",
      "Hello! How may I help you?",
      "Hi there! What can I do for you?"
    ],
    1: [
      "What assistance do you need?",
      "How can I serve you further?",
      "Is there something specific you need help with?",
      "How can I be of more help?",
      "What are you looking for?"
    ],
    2: [
      "Do you have a reservation?", 
      "Is this regarding a booking?",
      "Can I have your reservation details?",
      "Are you here to check in?",
      "Is this about a room booking?"
    ],
    3: [
      "How many nights will you be staying?", 
      "Can I get the name for the reservation?", 
      "Do you require a special type of room?", 
      "How many rooms did you book?", 
      "Is there any special request for your stay?"
    ],
    4: [
      "Would you like a map of the area?", 
      "Any allergies we should know about?", 
      "Need help with transportation?", 
      "Do you want an early check-in?", 
      "Would you like assistance with your luggage?"
    ],
  };

  const setHeadings = {
    0: "Welcome",
    1: "Primary Reason for Visit",
    2: "Reservation Inquiry",
    3: "Follow-up 1",
    4: "Follow-up 2",
  };

  useEffect(() => {
    setQuestions(questionSets[currentSet]);
  }, [currentSet]);

  const handleFeedbackChange = (questionIndex, value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [`q${questionIndex + 1}`]: value,
    }));
  };

  const handleNextSet = () => {
    if (currentSet === Object.keys(questionSets).length - 1) {
      // Last set, redirect to post-survey
      navigate('/post-survey');
    } else {
      setCurrentSet(currentSet + 1);
    }
  };

  const handlePrevSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };

  const handleSubmitSurvey = () => {
    // Process the survey data if needed
    console.log('Survey data:', feedback);
    // Redirect to post-survey
    navigate('/post-survey');
  };

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <h1>I am Rob, your Receptionist for today</h1>
      <LottieAnimation />

      <div >
        <h2>Questions: {setHeadings[currentSet]}</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <p style={{ fontSize: '20px' }}>
              <strong>{question}</strong>
            </p>
            <div>
              <p>
                How Polite do you find this Question:&nbsp;
                <select
                  value={feedback[`q${index + 1}`]}
                  onChange={(e) =>
                    handleFeedbackChange(index, parseInt(e.target.value))
                  }
                >
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

export default SurveyComponent;
