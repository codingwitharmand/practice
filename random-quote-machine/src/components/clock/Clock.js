import './Clock.scss';
import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className="clock">
                <h1>25 + 5 Clock</h1>
                <div className='clock__head'>
                    <div className='break'>
                        <h2>Break Length</h2>
                        <span>5</span>
                    </div>
                    <div className='session'>
                        <h2>Session Length</h2>
                        <span>5</span>
                    </div>
                </div>
                <div className='clock__body'>
                    <h3>Session</h3>
                    <span>25:00</span>
                </div>
                <div className='clock__buttons'>
                </div>
            </div>
        )
    }
}

export default Clock;