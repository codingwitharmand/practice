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
            sessionLengthIntValue: 25,
            sessionLength: '25:00',
        }
    }

    incrementBreak = () => {
        let newTime  = parseInt(this.state.breakLength) + 1;
        if(newTime > 60) return;
        this.setState({
            breakLength: parseInt(this.state.breakLength) + 1
        });
    }

    decrementBreak = () => {
        let newTime = parseInt(this.state.breakLength) - 1;
        if (newTime < 1) return;
        this.setState({
            breakLength: newTime
        });
    }

    incrementSession = () => {
        let newTime  = parseInt(this.state.sessionLength) + 1;
        if(newTime > 60) return;
        this.setState({
            sessionLength: `${newTime}:00`,
            sessionLengthIntValue: newTime
        });
    }

    decrementSession = () => {
        let newTime = parseInt(this.state.sessionLength) - 1;
        if (newTime < 1) return;
        this.setState({
            sessionLength: `${newTime}:00`,
            sessionLengthIntValue: newTime
        });
    }

    handleReset = () => {
        this.setState({
            isRunning: false,
            timeLeft: `${this.state.sessionLength}:00`,
            breakLength: 5,
            sessionLength: 25
        });
    }

    render() {
        return(
            <div className="clock">
                <h1>25 + 5 Clock</h1>
                <div className='clock__head'>
                    <div className='break'>
                        <h2 id="break-label">Break Length</h2>
                        <div className='cta'>
                            <FontAwesomeIcon id="break-decrement" size='2x' icon={faArrowDown} onClick={this.decrementBreak} />
                            <span id="break-length">{this.state.breakLength}</span>
                            <FontAwesomeIcon id="break-increment" size='2x' icon={faArrowUp} onClick={this.incrementBreak} />
                        </div>
                    </div>
                    <div className='session'>
                        <h2 id="session-label">Session Length</h2>
                        <div className='cta'>
                            <FontAwesomeIcon id="session-decrement" size='2x' icon={faArrowDown} onClick={this.decrementSession} />
                            <span id="session-length">{this.state.sessionLengthIntValue}</span>
                            <FontAwesomeIcon id="session-increment" size='2x' icon={faArrowUp} onClick={this.incrementSession} />
                        </div>
                    </div>
                </div>
                <div className='clock__body'>
                    <h3 id="timer-label">Session</h3>
                    <span id="time-left">{this.state.sessionLength}</span>
                </div>
                <div className='clock__buttons'>
                    <FontAwesomeIcon id="start-stop" size='2x' icon={this.state.isRunning ? faPause : faPlay} />
                    <FontAwesomeIcon id="reset" size='2x' icon={faPowerOff} onClick={this.handleReset} />
                </div>
            </div>
        )
    }
}

export default Clock;