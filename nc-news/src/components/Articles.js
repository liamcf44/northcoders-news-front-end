import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import ArticleInfo from './ArticleInfo';

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

    if (!articles) {
      return <p>Loading.....</p>;
    } else {
      return (
        <section className="articleTitles">
          <div className="articleList">
            <h3>{pathname.substring(10).toUpperCase()} ARTICLES</h3>
            {articles.map(article => {
              if (
                article.belongs_to.title.toLowerCase() ===
                pathname.substring(10)
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
            <Link to="/addArticle" className="addArticle">
              <button>Add an Article</button>
            </Link>
          </div>

          <ArticleInfo
            selectedArticle={this.props.selectedArticle}
            selectedUser={this.props.selectedUser}
          />
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
