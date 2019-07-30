import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { Header } from './header';

export const App = () => (
  <Router>
    <Header />

    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>

    <Route exact path="/" component={() => <div>Home</div>} />
    <Route exact path="/about" component={() => <div>About</div>} />
    <Route exact path="/contact" component={() => <div>Contact</div>} />

    <div className="row">
      <p>
        {
          "Time to write some code, and chew bubblegum. Only I'm all out of gum."
        }
      </p>
    </div>
  </Router>
);
