import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import HomePage from './components/HomePage';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {
  state = {
    user: {
      _id: '5af568397e27165f2c6c2020',
      username: 'jessjelly'
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <br />
        <br />
        <Route exact path="/" component={HomePage} />
        <Switch>
          <Route
            path="/articles/:topic/:articleid"
            render={props => (
              <ArticleInfo {...props} userDetails={this.state.user} />
            )}
          />
          <Route
            path="/articles/:topic"
            render={props => <Articles {...props} />}
          />
        </Switch>
        <Route
          exact
          path="/addArticle"
          render={props => <AddArticle {...props} user={this.state.user} />}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
