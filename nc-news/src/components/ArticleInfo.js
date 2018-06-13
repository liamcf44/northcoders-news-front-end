import React, { Component } from 'react';
import axios from 'axios';
import AddComment from './AddComment';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {},
    articleComments: {}
  };

  componentDidUpdate = async (prevProps, prevState) => {
    let { selectedArticle } = this.props;
    if (prevProps !== this.props || prevState !== this.state) {
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
                  <h5>{comment.created_by.username}:</h5>
                  <p>{comment.body}</p>
                  <p>Votes: {comment.votes}</p>
                  <span>
                    <i
                      className="far fa-arrow-alt-circle-up"
                      onClick={() => this.handleVotes(comment._id, 'up')}
                    />
                    <i
                      className="far fa-arrow-alt-circle-down"
                      onClick={() => this.handleVotes(comment._id, 'down')}
                    />
                  </span>
                </div>
              );
            })}
            <br />
            <AddComment
              articleId={articleResult[0]._id}
              userDetails={this.props.userDetails}
            />
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

  handleVotes = (id, direction) => {
    axios
      .put(
        `https://liamcf44-northcoders-news.herokuapp.com/api/comments/${id}?vote=${direction}`
      )
      .catch(err => console.log(err));
  };
}

export default ArticleInfo;
