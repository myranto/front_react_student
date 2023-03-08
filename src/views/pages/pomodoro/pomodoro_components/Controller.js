import React, { Component } from 'react';
import '../../../../css/Controller.css';

export default class Controller extends Component {
  render() {
    return (
      <div className="controller">
        <button id="start_stop" className='btn' onClick={this.props.onStartStop}>
          {this.props.isStart ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={this.props.onReset}>Reset</button>
      </div>
    )
  }
}