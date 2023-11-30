import React, { useState } from 'react';
import PostSurvey from '../Components/PostSurvey/PostSurvey';
import LottieAnimation from '../Components/LottieAnimation';

const PostSurveyPage = () => {
  // State to track whether the survey has been submitted
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Function to handle survey submission
  const handlePostSurveySubmit = (postSurveyData) => {
    // Process the post-survey data, you can store it or take any other action
    console.log('Post Survey Data:', postSurveyData);

    // Set the state to indicate that the survey has been submitted
    setSurveySubmitted(true);
  };

  return (
    <div>
      {surveySubmitted ? (
        // If survey has been submitted, show a thank you message
        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
             <LottieAnimation />
          <h2>Thank you for completing the survey! 🥳</h2>
          {/* You can add additional content or redirect the user if needed */}
        </div>
      ) : (
        // If survey has not been submitted, render the PostSurvey component
        <PostSurvey onSubmitSurvey={handlePostSurveySubmit} />
      )}
    </div>
  );
};

export default PostSurveyPage;
