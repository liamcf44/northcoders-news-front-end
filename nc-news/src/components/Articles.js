import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

class Articles extends Component {
  state = {
    articles: {}
  };

  componentDidMount = async () => {
    const data = await this.fetchArticleData();
    this.setState({
      articles: data
    });
  };

  render() {
    let pathname = this.props.location.pathname;
    let { articles } = this.state.articles;
    let { handleClick } = this.props;

    if (!articles || pathname === '/') {
      return (
        <div>
          <p>Welcome to NC-News</p>
          <p>Please select a topic from above</p>
        </div>
      );
    } else {
      return (
        <section className="articleTitles">
          <h3>{pathname.substring(1).toUpperCase()} ARTICLES</h3>
          {articles.map(article => {
            if (
              article.belongs_to.title.toLowerCase() === pathname.substring(1)
            )
              return (
                <div key={article._id} className="articleListItem">
                  <a
                    onClick={handleClick}
                    id={article._id}
                    name="selectedArticle"
                  >
                    {article.title}
                  </a>
                  <br />
                  <a
                    onClick={handleClick}
                    id={article.created_by.username}
                    name="selectedUser"
                  >
                    created by: {article.created_by.username}
                  </a>
                  <br />
                  <br />
                </div>
              );
          })}
        </section>
      );
    }
  }

  fetchArticleData = async () => {
    let { data } = await axios
      .get('https://liamcf44-northcoders-news.herokuapp.com/api/articles/')
      .catch(err => console.log(err));
    return data;
  };
}

export default Articles;
