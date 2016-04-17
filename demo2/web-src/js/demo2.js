import React from 'react'
import ReactDOM from 'react-dom'

class Greeting extends React.Component {
    render(){
       return <h1>Hello, world!</h1>;
    }
}

ReactDOM.render(
  <Greeting />,
  document.getElementById('reactHolder')
);
