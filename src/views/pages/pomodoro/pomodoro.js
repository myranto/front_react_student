import React from 'react';
import '../../../css/pomodoro.css';
import PomodoroConfig from './pomodoro_components/PomodoroConfig';

const pomodoro = () =>{
return(
<div className="pomodoro"><PomodoroConfig 
  defaultBreakLength='5' 
  defaultSessionLength='25' /></div>
);
}
export default pomodoro