import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LottieAnimation from '../LottieAnimation';

const Consent = () => {
  const navigate = useNavigate();
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsent = () => {
    setConsentGiven(true);
    // Redirect to the survey page
    navigate('/pre-survey');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <LottieAnimation />
      <h1>Welcome to the Robotic Survey!</h1>
      <h3>Please read the consent form below:</h3>
      
        <p>
          We are conducting a research study to learn how robot receptionists can behave politely.
          If you volunteer to be in this study, you will be asked to perform general interactions with a virtual robot receptionist. 
          You will need to choose responses to interact with the virtual robot from a set of available options and provide scores that reflect the politeness of the interaction.
        </p>
        <p>
          Your participation should take about 10 minutes. If you are consenting to participate in this study, please click on yes and continue the experiment.
        </p>
        <p>
          Benefits of doing research are not definite; but we hope to evaluate how our proposed human-robot interaction framework can learn to interact politely with potential customers in a hotel setting. There are no direct benefits to you in this study activity.
        </p>
        <p>
          
          The researchers and the University of Nevada, Reno will treat your identity and the information collected about you with professional standards of confidentiality and protect it to the extent allowed by law. You will not be personally identified in any reports or publications that may result from this study. The US Department of Health and Human Services, the University of Nevada, Reno Research Integrity Office, and the Institutional Review Board may look at your study records.
        </p>
        <p>
          You may ask questions of the researcher at any time by sending an email to Suman Rath at srath@nevada.unr.edu.    
        </p>
        <p>
          Your participation in this study is completely voluntary. You may stop at any time. Declining to participate or stopping your participation will not have any negative effects on you.
        </p>
        <p>
          You may ask about your rights as a research participant. If you have questions, concerns, or complaints about this research, you may report them (anonymously if you so choose) by calling the University of Nevada, Reno Research Integrity Office at 775.327.2368.
        </p>
        <div >
      </div>

      <button onClick={handleConsent} disabled={consentGiven}>
        {consentGiven ? 'Consent Given' : 'I Agree'}
      </button>
    </div>
  );
};

export default Consent;
