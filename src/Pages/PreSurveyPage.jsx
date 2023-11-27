import React from 'react';
import PreSurvey from '../Components/PreSurvey/PreSurvey';

const PreSurveyPage = () => {
    const handleStartSurvey = (preSurveyData) => {
        // Handle the pre-survey data, e.g., send it to a server
        console.log('Pre-survey data:', preSurveyData);
    };

    return (
        <div>
            <PreSurvey onStartSurvey={handleStartSurvey} />
        </div>
    );
};

export default PreSurveyPage;
