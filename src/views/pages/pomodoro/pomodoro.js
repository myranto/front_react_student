import React from 'react';
import '../../../css/pomodoro.css';
import PomodoroConfig from './pomodoro_components/PomodoroConfig';
import { setPomodoroHeader } from 'components/AppHeader';

setPomodoroHeader(false)
const pomodoro = () =>{
  
  React.useEffect(() => {
    setPomodoroHeader(true)
  }, []);
return(
  <div className="pomodoro">
      <PomodoroConfig
      defaultBreakLength='5'
      defaultSessionLength='25'
      value="notHeader" 
      /></div>
);
}
export default pomodoro