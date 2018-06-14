import React, { Component } from 'react';
import * as api from '../api';
import AddComment from './AddComment';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {},
    articleComments: []
  };

  componentDidMount = async () => {
    const id = this.props.match.params.articleid;

    const articleData = await api.fetchIndividualArticleData(id);
    let commentData;
    try {
      commentData = await api.fetchCommentData(id);
    } catch (e) {
      commentData = [];
    }
    this.setState({
      selectedArticle: articleData,
      articleComments: commentData
    });
  };

  componentDidUpdate = async prevProps => {
    const id = this.props.match.params.articleid;
    if (this.props.match.url !== prevProps.match.url) {
      const articleData = await api.fetchIndividualArticleData(id);
      const commentData = await api.fetchCommentData(id);
      this.setState({
        selectedArticle: articleData,
        articleComments: commentData
      });
    }
  };

  render() {
    const { selectedArticle, articleComments } = this.state;

    if (!selectedArticle._id) return <p>loading....</p>;
    else {
      return (
        <section className="articleInfo">
          <div className="articleContent">
            <h4>{selectedArticle.title}</h4>
            <h5>Created by: {selectedArticle.created_by.username}</h5>
            <p>Votes: {selectedArticle.votes}</p>
            <span>
              <i
                className="far fa-arrow-alt-circle-up"
                onClick={() =>
                  this.handleVotes('article', selectedArticle._id, 'up')
                }
              />
              <i
                className="far fa-arrow-alt-circle-down"
                onClick={() =>
                  this.handleVotes('article', selectedArticle._id, 'down')
                }
              />
            </span>
            <p>{selectedArticle.body}</p>
          </div>
          <br />
          <h4>{articleComments.length} Comments</h4>
          <AddComment
            articleId={selectedArticle._id}
            userDetails={this.props.userDetails}
          />
          <div className="commentContent">
            {articleComments.map(comment => {
              return (
                <div key={comment._id}>
                  <h5>{comment.created_by.username}:</h5>
                  <p>{comment.body}</p>
                  <p>Votes: {comment.votes}</p>
                  <span>
                    <i
                      className="far fa-arrow-alt-circle-up"
                      onClick={() =>
                        this.handleVotes('comment', comment._id, 'up')
                      }
                    />
                    <i
                      className="far fa-arrow-alt-circle-down"
                      onClick={() =>
                        this.handleVotes('comment', comment._id, 'down')
                      }
                    />
                  </span>
                  <button onClick={() => api.deleteComment(comment._id)}>
                    Delete Comment
                  </button>
                  <div>{}</div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  }

  handleVotes = (space, id, direction) => {
    const { selectedArticle, articleComments } = this.state;
    api.sendVote(space, id, direction);
    if (space === 'article') {
      this.setState({
        selectedArticle: {
          ...selectedArticle,
          votes:
            direction === 'up'
              ? selectedArticle.votes + 1
              : selectedArticle.votes - 1
        }
      });
    }
    if (space === 'comment') {
      let data = articleComments.map(comment => {
        if (id === comment._id)
          direction === 'up' ? comment.votes++ : comment.votes--;
        return comment;
      });
      this.setState({
        articleComments: data
      });
    }
  };
}

export default ArticleInfo;
