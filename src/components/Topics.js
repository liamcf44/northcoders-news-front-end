import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    if (!articles) {
      return <p />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h3>{topic.toUpperCase()} ARTICLES</h3>
            <br />
          </div>
          <div className="row justify-content-start">
            <div className="col-sm align-self-start">
              {articles.map(article => {
                if (article.belongs_to.title.toLowerCase() === topic)
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
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Articles;
