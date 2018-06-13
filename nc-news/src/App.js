import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import HomePage from './components/HomePage';

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
          <Route exact path="/" component={HomePage} />
          <Route
            path="/articles/"
            render={props => (
              <Articles
                {...props}
                handleClick={this.handleClick}
                selectedArticle={this.state.selectedArticle}
                selectedUser={this.state.selectedUser}
              />
            )}
          />
          <Route
            exact
            path="/addArticle"
            render={props => <AddArticle {...props} />}
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
