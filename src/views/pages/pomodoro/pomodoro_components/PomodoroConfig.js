import React, { Component } from 'react';
import Settings from './Settings';
import Times from './Times';
import Controller from './Controller';
import '../../../../css/App.css';




export default class PomodoroConfig extends Component {
  static time = null;
  static sessionLength = 0;

  constructor(props) {
    super(props);
    this.value = {title:this.props.value};
    this.audioBeep = React.createRef();
    PomodoroConfig.sessionLength = this.props.defaultSessionLength
    this.state = {
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt( this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(  this.props.defaultSessionLength , 10) * 60,
      isStart: false,
      timerInterval: null
    }

    this.onIncreaseBreak = this.onIncreaseBreak.bind(this);
    this.onDecreaseBreak = this.onDecreaseBreak.bind(this);
    this.onIncreaseSession = this.onIncreaseSession.bind(this);
    this.onDecreaseSession = this.onDecreaseSession.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onStartStop = this.onStartStop.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);


  }




  onIncreaseBreak() {
    if (this.state.breakLength < 60 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }

  onDecreaseBreak() {
    if (this.state.breakLength > 1 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  onIncreaseSession() {
    if (this.state.sessionLength < 60 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeftInSecond: (this.state.sessionLength + 1) * 60
      });
    }
  }

  onDecreaseSession() {
    if (this.state.sessionLength > 1 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeftInSecond: (this.state.sessionLength - 1) * 60
      });
    }
  }

  onReset() {
    this.setState({
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    });

    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {

    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.phaseControl();
        }, 1000)
      })
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      });
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1
    });
  }

  phaseControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeftInSecond === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timeLeftInSecond: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeftInSecond: this.state.sessionLength * 60
        });
      }
    }
  }
  componentDidUpdate(prevProps,prevState) {
    if(this.state.sessionLength!=prevState.sessionLength){
      localStorage.setItem('time',this.state.sessionLength)
      alert( this.state.sessionLength)
    }

  }

  render() {
    return (
      <div>
        { this.value.title === "notHeader" ? (
          <div className="pomodoro-clock">
            <div className="pomodoro-clock-header">
              <h1 className="pomodoro-clock-header-name">pomodoro</h1>
            </div>

            <Settings
              breakLength={this.state.breakLength}
              sessionLength={this.state.sessionLength}
              isStart={this.state.isStart}
              onDecreaseBreak={this.onDecreaseBreak}
              onDecreaseSession={this.onDecreaseSession}
              onIncreaseBreak={this.onIncreaseBreak}
              onIncreaseSession={this.onIncreaseSession}
            />

            <Times
              timeLabel={this.state.timeLabel}
              timeLeftInSecond={this.state.timeLeftInSecond}
              value="notHeader"
            />

            <Controller
              onReset={this.onReset}
              onStartStop={this.onStartStop}
              isStart={this.state.isStart}
              value="notHeader"
            />

            <audio id="beep" preload="auto" ref={this.audioBeep}></audio>



          </div>):(
          <><> <table><tr><td><Controller
            onStartStop={this.onStartStop}
            isStart={this.state.isStart}
            value="" /></td>
            <td> <Times
              timeLabel={this.state.timeLabel}
              timeLeftInSecond={this.state.timeLeftInSecond} /></td></tr></table></><audio id="beep" preload="auto" ref={this.audioBeep}></audio></>
        )}
      </div>
    );
  }
}

