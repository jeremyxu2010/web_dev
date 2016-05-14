import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class App extends React.Component{
  render(){
    return <div>{this.props.children}</div> ;
  }
}

class Home extends React.Component{
  render(){
    return <h1>Home Page</h1> ;
  }
}

class About extends React.Component{
  render(){
    return <h1>About Page</h1> ;
  }
}

class Features extends React.Component{
  render(){
    return <h1>Features Page</h1> ;
  }
}

document.body.innerHTML = '<div id="reactHolder"></div>';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='features' component={Features} />
      <Route path='*' component={Home} />
    </Route>
  </Router>,
  document.getElementById('reactHolder')
);
