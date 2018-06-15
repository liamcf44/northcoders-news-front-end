import React, { Component } from 'react';
import * as api from '../api';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
  state = {
    topics: {}
  };

  componentDidMount = async () => {
    const data = await api.fetchTopicData();
    this.setState({
      topics: data
    });
  };

  render() {
    const { topics } = this.state.topics;
    if (!topics) {
      return <p>loading...</p>;
    } else {
      return (
        <div className="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink to="/" key="home" className="nav-link">
                    Home <span class="sr-only">(current)</span>
                  </NavLink>
                </li>
                {topics.map(topic => {
                  return (
                    <li key={topic.slug} className="nav-item">
                      <NavLink
                        to={`/articles/${topic.slug}`}
                        className="nav-link"
                      >
                        {topic.title}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <Link to="/addArticle">
                <button className="addArticleButton">Add an Article</button>
              </Link>
              <span class="navbar-text" id="NCTitle">
                NC-News
              </span>
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default Header;
