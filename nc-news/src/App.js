import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Articles from './components/Articles';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {
  state = {
    selectedArticle: '',
    selectedUser: ''
  };

  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <br />
        <br />
        <div className="container">
          <Route
            path="/"
            render={props => (
              <Articles {...props} handleClick={this.handleClick} />
            )}
          />
          <ArticleInfo
            selectedArticle={this.state.selectedArticle}
            selectedUser={this.state.selectedUser}
          />
        </div>
      </div>
    );
  }

  handleClick = ({ target }) => {
    this.setState({
      [target.name]: target.id
    });
  };
}

export default App;
