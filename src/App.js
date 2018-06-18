import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Topics from './components/Topics';
import AddArticle from './components/AddArticle';
import HomePage from './components/HomePage';
import ArticleInfo from './components/ArticleInfo';
import ErrorPage from './components/ErrorPage';

class App extends Component {
  state = {
    user: {
      _id: '5b277d673d3fae7d982d2d06',
      username: 'jessjelly'
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <br />
        <br />
        <br />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/articles/:topic/:articleid"
            render={props => (
              <ArticleInfo {...props} userDetails={this.state.user} />
            )}
          />
          <Route
            path="/articles/:topic"
            render={props => <Topics {...props} />}
          />
          <Route
            exact
            path="/addArticle"
            render={props => <AddArticle {...props} user={this.state.user} />}
          />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
