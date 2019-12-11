import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component{

    constructor(){
        super();

        this.state = {
            count :0
        }
    }

    render = () => {
        return (
            <div className="App">
            <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
            <span className="count">{this.state.count}</span>
            <div><button className="reset" onClick={this.reset}>Reset</button></div>
           </div>
        )
    }

    increment = (by) => {        
        this.setState(
          (prevState) =>  {
            return {count : prevState.count + by}
        }
       );
    }

    decrement = (by) => {
        this.setState(
            (prevState) => {
                return {count : prevState.count - by}
            }
        )
    }

    reset = () =>{
        this.setState(
            (prevState) => {
                return { count : 0}
            }
        )
    }
}


class CounterButton extends Component {

    constructor(){
        super();

    }

    render = () => {
        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        )
    }

} 

CounterButton.defaultProps = {
    by:1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter;

