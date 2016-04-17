import React from 'react'

const noop = function(){};

class GreetingComponent extends React.Component{

    constructor(props){
        super(props);
        this._changeName = this.changeName.bind(this);
    }

    changeName(e){
        this.props.changeName(e.target.value);
    }

    render() {
        return (
            <div>
                <input value={this.props.name} onChange={this._changeName}/><br/>
                <label>{this.props.output}</label>
            </div>
        );
    }
};

GreetingComponent.propTypes = {
    changeName: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    output: React.PropTypes.string.isRequired
};

GreetingComponent.defaultProps = {
    changeName: noop,
    name: '',
    output: ''
};

export default GreetingComponent;
