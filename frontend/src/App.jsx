import React from 'react';
import { Route, Routes } from'react-router';
import Home from './components/Home';
import Appointment from './components/Templets/Appointment';
import Doctor from './components/Templets/Doctor';
import Sysmptoms from './components/Templets/Symptoms';
import Messages from './components/Templets/Messages';
import Settings from './components/Templets/Settings';
import Signup from './components/Templets/Signup';
const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Appointment' element={<Appointment />} />
        <Route path='/Doctor' element={<Doctor/>}/>
        <Route path='/Symptoms' element={<Sysmptoms/>}/>
        <Route path='/Messages' element={<Messages/>}/>
        <Route path='/Settings' element={<Settings/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
};

export default App;
