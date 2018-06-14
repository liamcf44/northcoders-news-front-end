import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: {}
  };

  componentDidMount = async () => {
    const data = await api.fetchArticleData();
    this.setState({
      articles: data
    });
  };

  render() {
    let pathname = this.props.match.url;
    let topic = this.props.match.params.topic;
    let { articles } = this.state.articles;

    if (!articles) {
      return <p>Loading.....</p>;
    } else {
      return (
        <section className="articleTitles">
          <div className="articleList">
            <h3>{topic.toUpperCase()} ARTICLES</h3>
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
        </section>
      );
    }
  }
}

export default Articles;
