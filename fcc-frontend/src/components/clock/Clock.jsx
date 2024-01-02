import './Clock.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faPowerOff } from '@fortawesome/free-solid-svg-icons';


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isRunning: false,
        breakLength: 5,
        sessionLength: 25,
        timeLeft: '25:00',
        interval: null,
        isBreak: false
      }
    }
    incrementBreak = () => {
      let newValue  = parseInt(this.state.breakLength) + 1;
      if(newValue > 60) return;
      this.setState({
        breakLength: parseInt(this.state.breakLength) + 1
      });
    }
  
    decrementBreak = () => {
      let newValue = parseInt(this.state.breakLength) - 1;
      if (newValue < 1) return;
      this.setState({
        breakLength: newValue
      });
    }
    
    incrementSession = () => {
      let newValue  = parseInt(this.state.sessionLength) + 1;
      if(newValue > 60) return;
      this.setState({
        timeLeft: newValue < 10 ? `0${newValue}:00` : `${newValue}:00`,
        sessionLength: newValue
      });
    }
  
    decrementSession = () => {
      let newValue = parseInt(this.state.sessionLength) - 1;
      if (newValue < 1) return;
      this.setState({
        timeLeft: newValue < 10 ? `0${newValue}:00` : `${newValue}:00`,
        sessionLength: newValue
      });
    }
    
    handleReset = () => {
      clearInterval(this.state.interval);
      this.setState({
        isRunning: false,
        timeLeft: '25:00',
        breakLength: 5,
        sessionLength: 25,
        isBreak: false
      });
      const audio = document.getElementById('beep');
      audio.pause();
      audio.currentTime = 0;
    }
    
    handleStartStop = () => {
      const isRunning = this.state.isRunning;
      if(!isRunning){
        this.startTimer()
      } else {
        clearInterval(this.state.interval);
      }
      this.setState({
        isRunning: !isRunning
      });
    }
  
    startTimer = () => {
      clearInterval(this.state.interval);
      const interval = setInterval(() => {
        let [minutes, seconds] = this.state.timeLeft.split(':').map(Number);
        let newValue;
        if(seconds === 0){
          if(minutes === 0){
            let breakValue = this.state.breakLength < 10 ? `0${this.state.breakLength}:00` : `${this.state.breakLength}:00`;
            let sessionValue = this.state.sessionLength < 10 ? `0${this.state.sessionLength}:00` : `${this.state.sessionLength}:00`;
            newValue = this.state.isBreak ? sessionValue : breakValue;
            this.setState({
              isBreak: !this.state.isBreak
            })
            document.getElementById('beep').play();
          } else {
            newValue = `${minutes - 1 < 10 ? '0' : ''}${minutes - 1}:59`
          }
        } else {
          newValue = `${minutes < 10 ? '0' : ''}${minutes}:${seconds - 1 < 10 ? '0' : ''}${seconds - 1}`
        }
        this.setState({
          timeLeft: newValue
        })
      }, 1000);
      this.setState({
        interval: interval
      })
    }
    
    render() {
        return(
            <div className="clock">
                <h1>25 + 5 Clock</h1>
                <div className='clock__head'>
                    <div className='break'>
                        <h2 id="break-label">Break Length</h2>
                        <div className='cta'>
                            <button id="break-decrement" onClick={this.decrementBreak} value='-'>
                                <FontAwesomeIcon size='2x' icon={faArrowDown}  />
                            </button>
                            <div id="break-length" className='clock__display'>{this.state.breakLength}</div>
                            <button id="break-increment" onClick={this.incrementBreak} value='+'>
                                <FontAwesomeIcon size='2x' icon={faArrowUp} />
                            </button>
                        </div>
                    </div>
                    <div className='session'>
                        <h2 id="session-label">Session Length</h2>
                        <div className='cta'>
                            <button id="session-decrement" onClick={this.decrementSession} >
                                <FontAwesomeIcon size='2x' icon={faArrowDown} />
                            </button>
                            <div id="session-length" className='clock__display'>{this.state.sessionLength}</div>
                            <button id="session-increment" onClick={this.incrementSession} >
                                <FontAwesomeIcon size='2x' icon={faArrowUp} />
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className='clock__body'>
                    <h3 id="timer-label">
                        {this.state.isBreak ? 'Break has begun' : 'Session'}
                    </h3>
                    <div className='clock__display' id="time-left">{this.state.timeLeft}</div>
                </div>
                <div className='clock__buttons'>
                    <button id="start_stop" onClick={this.handleStartStop}>
                        <FontAwesomeIcon size='2x' icon={this.state.isRunning ? faPause : faPlay}  />
                    </button>
                    <button id="reset" onClick={this.handleReset}>
                        <FontAwesomeIcon size='2x' icon={faPowerOff} />
                    </button>
                    
                </div>
                <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" id="beep" />
            </div>
        )
    }
  }

export default Clock;