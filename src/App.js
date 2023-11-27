import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SurveyPage from './Pages/SurveyPage';
import PreSurveyPage from './Pages/PreSurveyPage';
import PostSurveyPage from './Pages/PostSurveyPage';




function App() {
  return (
    <div >
      <BrowserRouter>
        
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pre-survey' element={<PreSurveyPage/>}/>
          <Route path='/survey' element={<SurveyPage/>}/>
          <Route path='/post-survey' element={<PostSurveyPage/>}/>
      
         </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;