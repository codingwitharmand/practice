import React from 'react';
import './Calculator.scss';

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            inputValue: 0
        }
    }

    reset = () => {
        this.setState({ display: 0, inputValue: 0 });
    }

    displayNumber = (e) => {
        let newValue = parseInt(e.target.innerText);
        if (!isNaN(newValue)) {
            this.state.display === 0 ?
                (newValue === 0 ?
                    this.setState({ display: 0, inputValue: 0}) :
                    this.setState({ display: e.target.innerText, inputValue: e.target.innerText })) :
                this.setState((prevState) => ({ 
                    display: prevState.display + e.target.innerText,
                    inputValue: /[+\-*/]/g.test(prevState.inputValue) ? e.target.innerText : prevState.inputValue + e.target.innerText
                }));
        }
        else if (e.target.innerText === '.') {
            let lastNumberAsString = this.getLastNumberAsString(this.state.display);
            if (this.state.display[this.state.display.toString().length - 1] !== '.' && !lastNumberAsString.includes('.')) {
                this.setState({ 
                    display: this.state.display + '.',
                    inputValue: this.state.inputValue + '.'
                });
            }

        }
    }

    displayOperation = (e) => {
        if(this.state.display.toString().includes('=')) {
            let lastValue = this.state.display.toString().split('=')[1];
            this.setState({ 
                display: lastValue + e.target.innerText,
                inputValue: e.target.innerText
            });
        }
        else this.setState((prevState) => ({ 
            display: prevState.display + e.target.innerText,
            inputValue: e.target.innerText
        }));
    }

    doOperation = () => {
        //Remove faulty operations
        let expression = String(this.state.display)
            .replaceAll('x', '*');

        let values = expression.split(/[/+\-*]/).filter(Boolean);
        let operators = expression.split(/(\d+\.)?\d+/).filter(Boolean);
        let newOperators = this.getOperators(operators);
        expression = this.getExpression(values, newOperators);

        if (/[+\-*/]/g.test(expression)) {
            try {
                let result = eval(expression).toFixed(4);
                this.setState((prevState) => ({ 
                    display: `${prevState.display}=${parseFloat(result)}`,
                    inputValue: parseFloat(result)
                }));
            } catch (err) {
                console.error('Error: Invalid Input');
                this.reset();
            };
        }
    }

    getLastNumberAsString = (instruction) => {
        return String(instruction).split(/[/*\-+]/).pop();
    }

    getOperators = (operators) => {
        let newOperators = [];
        for(let operator of operators) {
            if(operator[operator.length-1] !== '-')
                newOperators.push(operator[operator.length-1]);
            else {
                console.log();
                if(operator[operator.length-2])
                    newOperators.push(operator[operator.length-2] + operator[operator.length-1]);
                else newOperators.push('-')
            }
        }
        return newOperators;
    }

    getExpression = (values, operators) => {
        if(operators.includes('.'))
            operators = operators.filter(o => o !== '.')
        let expression = '';
        for(let i=0;i<values.length;i++) {
            expression += values[i];
            if(i < operators.length)
            expression += operators[i];
        }  
        return expression;
    }

    render() {
        return (
            <div className="calculator">
                <div className='calculator__wrapper'>
                    <div className='calculator__formula'>{this.state.display}</div>
                    <div id='display' className='calculator__result'>{this.state.inputValue}</div>
                    <div className='calculator__buttons'>
                        <button id='clear' className='two-x' onClick={this.reset}>AC</button>
                        <button id='divide' className='operator' onClick={this.displayOperation}>/</button>
                        <button id='multiply' className='operator' onClick={this.displayOperation}>x</button>
                        <button id='seven' onClick={this.displayNumber}>7</button>
                        <button id='eight' onClick={this.displayNumber}>8</button>
                        <button id='nine' onClick={this.displayNumber}>9</button>
                        <button id='subtract' className='operator' onClick={this.displayOperation}>-</button>
                        <button id='four' onClick={this.displayNumber}>4</button>
                        <button id='five' onClick={this.displayNumber}>5</button>
                        <button id='six' onClick={this.displayNumber}>6</button>
                        <button id='add' className='operator' onClick={this.displayOperation}>+</button>
                        <button id='one' onClick={this.displayNumber}>1</button>
                        <button id='two' onClick={this.displayNumber}>2</button>
                        <button id='three' onClick={this.displayNumber}>3</button>
                        <button id='equals' onClick={this.doOperation}>=</button>
                        <button id='zero' className='two-x' onClick={this.displayNumber}>0</button>
                        <button id='decimal' onClick={this.displayNumber}>.</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;
