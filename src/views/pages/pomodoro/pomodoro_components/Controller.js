import React, { Component } from 'react';
import '../../../../css/Controller.css';
import CIcon from '@coreui/icons-react'
import { Pause, Star } from '@mui/icons-material';
import { cilBirthdayCake, cilLockLocked, cilMediaPause, cilMediaPlay, cilUser } from '@coreui/icons'
import {
  CInputGroupText,
} from '@coreui/react'
export default class Controller extends Component {
  render() {
    return (
      <div>
        { this.props.value === "notHeader" ? (<div className="controller">
          <button id="start_stop" className='btn' onClick={this.props.onStartStop}>
            {this.props.isStart ? 'Pause' : 'Start'}
          </button>
          <button id="reset" onClick={this.props.onReset}>Reset</button>
        </div>):(
          <button id="start_stop" className='btn' onClick={this.props.onStartStop}>
            {this.props.isStart ? <CInputGroupText>
                <CIcon icon={cilMediaPause} />
              </CInputGroupText>
              : <CInputGroupText>
                <CIcon icon={cilMediaPlay} />
              </CInputGroupText> }
          </button>
        )}
      </div>
    )
  }
}
