import React, { Component } from 'react';
import * as api from '../api';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
  state = {
    topics: {}
  };

  componentDidMount = async () => {
    try {
      let data = await api.fetchTopicData();
      this.setState({
        topics: data
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  render() {
    const { topics } = this.state.topics;
    if (!topics) {
      return <p />;
    } else {
      return (
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <a class="navbar-brand">NC-News</a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink to="/" key="home" className="nav-link">
                    Home <span className="sr-only">(current)</span>
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
                <button type="button" className="btn btn-outline-light btn-lg">
                  Add an Article
                </button>
              </Link>
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default Header;
