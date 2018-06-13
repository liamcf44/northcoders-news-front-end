import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Articles from './components/Articles';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Articles />
        <ArticleInfo />
      </div>
    );
  }
}

export default App;
