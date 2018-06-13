import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Articles from './components/Articles';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <br />
        <br />
        <Route path="/" render={props => <Articles {...props} />} />
        <ArticleInfo />
      </div>
    );
  }
}

export default App;
