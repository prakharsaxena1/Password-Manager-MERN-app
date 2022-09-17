import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// Components
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Dashboard from './Components/Dashboard';
import Page404 from './Components/Page404';

const App = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path='/' element={<LandingPage navigate={navigate} />} />
      <Route path='/login' element={<LoginPage navigate={navigate} />} />
      <Route path='/register' element={<RegisterPage navigate={navigate} />} />
      <Route path='/app/*' element={<Dashboard navigate={navigate} />} />
      <Route path='*' element={<Page404 navigate={navigate} />} />
    </Routes>
  );
}

export default App;
