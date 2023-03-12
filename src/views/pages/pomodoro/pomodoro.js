import React, {useEffect, useState} from 'react';
import '../../../css/pomodoro.css';
import PomodoroConfig from './pomodoro_components/PomodoroConfig';
import {lastPomodoro} from "../../../database/Api";
import {setPomodoroHeader} from "../../../components/AppHeader";

setPomodoroHeader(false)
const pomodoro = () =>{

  React.useEffect(() => {
    setPomodoroHeader(true)
  }, []);
  const [dure, setDure] = useState(null);
  const [pause, setPause] = useState(null);
  useEffect(() => {
    lastPomodoro()
      .then((data) => {
        console.log(data)
        setDure(data.durree)
        setPause(data.pause)
      })
      .catch((error) => {
        // console.log("cuo")
        console.log(error)
      })
  }, []);
  return (
    <div className="pomodoro">
      {(dure!==null && pause!==null) && <PomodoroConfig
        defaultBreakLength={pause}
        defaultSessionLength={dure}
        value={"notHeader"}
      />}
    </div>
  );
}

export default pomodoro
