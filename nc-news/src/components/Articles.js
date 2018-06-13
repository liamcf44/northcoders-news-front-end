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
    console.log(articles, '*********************');
    console.log(pathname.substring(1), '~~~~~~~~~~~~~~~~~~~~~~~~');

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
                  <p>{article.title}</p>
                  <p>created by: {article.created_by.username}</p>
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
