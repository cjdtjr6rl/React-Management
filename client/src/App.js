import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { list, main } from './';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/list">회원 생성</Link>
              </li>
              <li>
                <Link to="/main">졸업사정회 표</Link>
              </li>
            </ul>
          </nav>
          <Route path='/list' component={list}/>
          <Route path='/main' component={main}/>
        </div>
      </Router>
    );
  }
}

export default App;