import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, NavLink } from 'react-router-dom';

class Header extends Component {
  state = {
    topics: []
  };

  componentDidMount = async () => {
    const data = await this.fetchTopicData();
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
        <section className="header">
          <div className="navBar">
            <NavLink to="/">Home</NavLink>
            {topics.map(topic => {
              return (
                <NavLink to={topic.slug} key={topic.slug}>
                  {topic.title}
                </NavLink>
              );
            })}
          </div>
          <div className="title">
            <h3>NC-News</h3>
          </div>
        </section>
      );
    }
  }

  fetchTopicData = async () => {
    const { data } = await axios
      .get('https://liamcf44-northcoders-news.herokuapp.com/api/topics/')
      .catch(err => console.log(err));
    return data;
  };
}

export default Header;
