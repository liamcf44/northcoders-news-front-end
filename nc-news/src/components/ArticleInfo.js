import React, { Component } from 'react';
import axios from 'axios';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {},
    articleComments: {}
  };

  componentDidUpdate = async prevProps => {
    let { selectedArticle } = this.props;
    if (prevProps !== this.props) {
      const articleData = await this.fetchIndividualArticleData(
        selectedArticle
      );
      const commentData = await this.fetchCommentData(selectedArticle);
      this.setState({
        selectedArticle: articleData,
        articleComments: commentData
      });
    }
  };

  render() {
    const { result: articleResult } = this.state.selectedArticle;
    const { comments: commentResult } = this.state.articleComments;
    console.log(commentResult);
    if (!articleResult) return <p>Please select an article or a user</p>;
    else {
      return (
        <section className="articleInfo">
          <div className="articleContent">
            <h4>{articleResult[0].title}</h4>
            <h5>Created by: {articleResult[0].created_by.username}</h5>
            <p>{articleResult[0].body}</p>
          </div>
          <br />
          <h4>Comments</h4>
          <div className="commentContent">
            {commentResult.map(comment => {
              return (
                <div key={comment._id}>
                  <p>{comment.created_by.username}:</p>
                  <p>{comment.body}</p>
                  <p>
                    Votes: {comment.votes} Created at:{comment.created_at}
                  </p>
                  <br />
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  }

  fetchIndividualArticleData = async id => {
    const { data } = await axios
      .get(`https://liamcf44-northcoders-news.herokuapp.com/api/articles/${id}`)
      .catch(err => console.log(err));
    return data;
  };

  fetchCommentData = async id => {
    const { data } = await axios
      .get(
        `https://liamcf44-northcoders-news.herokuapp.com/api/articles/${id}/comments`
      )
      .catch(err => console.log(err));
    return data;
  };
}

export default ArticleInfo;
