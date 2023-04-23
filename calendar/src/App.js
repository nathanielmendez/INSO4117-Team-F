import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import CalendarPage from './CalendarPage';
import LoginPage from './LoginPage';


const App = () => {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<LoginPage/>}/>

          <Route exact path="/calendar" element={<CalendarPage/>}/>

        </Routes>
    </Router>
  );
}

export default App;