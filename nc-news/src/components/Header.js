import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  state = {
    topics: {}
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
          <ul className="navBar">
            <li>
              <NavLink to="/" key="home" className="navLink">
                Home
              </NavLink>
            </li>
            {topics.map(topic => {
              return (
                <li key={topic.slug}>
                  <NavLink to={topic.slug} className="navLink">
                    {topic.title}
                  </NavLink>
                </li>
              );
            })}
            <li id="title" key="title">
              NC-News
            </li>
          </ul>
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
