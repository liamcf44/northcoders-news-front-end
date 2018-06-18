import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: {}
  };

  componentDidMount = async () => {
    try {
      let data = await api.fetchArticleData();
      this.setState({
        articles: data
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  render() {
    let pathname = this.props.match.url;
    let topic = this.props.match.params.topic;
    let { articles } = this.state.articles;
    let articleCount = 0;

    if (!articles) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <i className="fas fa-spinner fa-3x" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h3 id="subTitle">{topic.toUpperCase()} ARTICLES</h3>
          </div>
          <br />
          <br />
          <div className="row justify-content-start">
            <div className="col-sm align-self-start">
              {articles.map(article => {
                if (article.belongs_to.title.toLowerCase() === topic) {
                  articleCount++;
                  return (
                    <div key={article._id} className="articleListItem">
                      <Link
                        to={`${pathname}/${article._id}`}
                        id={article._id}
                        name="selectedArticle"
                      >
                        {article.title}
                      </Link>
                      <br />
                      <a id={article.created_by.username} name="selectedUser">
                        created by: {article.created_by.username}
                      </a>
                      <br />
                      <br />
                    </div>
                  );
                }
              })}
              {articleCount === 0 && <Redirect push to="/error" />}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Articles;
