import './Clock.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Beep from '../drum-machine/audios/W.mp3';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            breakLength: 5,
            sessionLength: 25,
            timeLeft: '00:05',
            interval: null,
            isBreak: false
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
            timeLeft: `${newTime}:00`,
            sessionLength: newTime
        });
    }

    decrementSession = () => {
        let newTime = parseInt(this.state.sessionLength) - 1;
        if (newTime < 1) return;
        this.setState({
            timeLeft: `${newTime}:00`,
            sessionLength: newTime
        });
    }

    handleReset = () => {
        clearInterval(this.state.interval);
        this.setState({
            isRunning: false,
            timeLeft: `25:00`,
            breakLength: 5,
            sessionLength: 25
        });
        document.getElementById('beep').stop()
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
            let newTime;
            if(seconds === 0){
                if(minutes === 0){
                    newTime = this.state.isBreak ? `${this.state.sessionLength}:00` : `${this.state.breakLength}:00`;
                    this.setState({
                        isBreak: !this.state.isBreak
                    })
                    document.getElementById('beep').play();
                } else {
                    newTime = `${minutes - 1 < 10 ? '0' : ''}${minutes - 1}:59`
                }
            } else {
                newTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds - 1 < 10 ? '0' : ''}${seconds - 1}`
            }
            this.setState({
                timeLeft: newTime
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
                            <FontAwesomeIcon id="break-decrement" size='2x' icon={faArrowDown} onClick={this.decrementBreak} />
                            <span id="break-length">{this.state.breakLength}</span>
                            <FontAwesomeIcon id="break-increment" size='2x' icon={faArrowUp} onClick={this.incrementBreak} />
                        </div>
                    </div>
                    <div className='session'>
                        <h2 id="session-label">Session Length</h2>
                        <div className='cta'>
                            <FontAwesomeIcon id="session-decrement" size='2x' icon={faArrowDown} onClick={this.decrementSession} />
                            <span id="session-length">{this.state.sessionLength}</span>
                            <FontAwesomeIcon id="session-increment" size='2x' icon={faArrowUp} onClick={this.incrementSession} />
                        </div>
                    </div>
                </div>
                <div className='clock__body'>
                    <h3 id="timer-label">
                        {this.state.isBreak ? 'Break has begun' : 'Session'}
                    </h3>
                    <span id="time-left">{this.state.timeLeft}</span>
                </div>
                <div className='clock__buttons'>
                    <FontAwesomeIcon id="start-stop" size='2x' icon={this.state.isRunning ? faPause : faPlay} onClick={this.handleStartStop} />
                    <FontAwesomeIcon id="reset" size='2x' icon={faPowerOff} onClick={this.handleReset} />
                </div>
                <audio src={Beep} id="beep" />
            </div>
        )
    }
}

export default Clock;