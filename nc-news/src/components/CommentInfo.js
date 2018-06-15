import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import handleInput from './HandleInput';

class CommentInfo extends Component {
  state = {
    articleComments: [],
    commentBody: ''
  };

  componentDidMount = async () => {
    const id = this.props.match.params.articleid;

    let commentData;
    try {
      commentData = await api.fetchCommentData(id);
    } catch (e) {
      commentData = [];
    }
    this.setState({
      articleComments: commentData
    });
  };

  componentDidUpdate = async prevProps => {
    const id = this.props.match.params.articleid;
    if (this.props.match.url !== prevProps.match.url) {
      const commentData = await api.fetchCommentData(id);
      this.setState({
        articleComments: commentData
      });
    }
  };

  render() {
    const { articleComments } = this.state;
    const { userDetails, articleID } = this.props;

    articleComments.sort((a, b) => {
      return b.created_at - a.created_at;
    });

    return (
      <section className="commentInfo">
        <h4>{articleComments.length} Comments</h4>
        <div className="addComment">
          <input
            placeholder="Add a comment here"
            name="commentBody"
            onChange={handleInput.bind(this)}
          />
          <button
            onClick={() =>
              this.handleAddComment(
                this.state.commentBody,
                articleID,
                userDetails
              )
            }
          >
            Add comment
          </button>
        </div>
        <div className="commentContent">
          {articleComments.map(comment => {
            return (
              <div key={comment._id}>
                <h5>{comment.created_by.username}:</h5>
                <p>{comment.body}</p>
                <p>
                  Created at:{' '}
                  {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss')}
                </p>
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
                {comment.created_by._id === userDetails._id && (
                  <button onClick={() => this.handleDeleteComment(comment._id)}>
                    Delete Comment
                  </button>
                )}
                <div>{}</div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  handleVotes = (space, id, direction) => {
    const { articleComments } = this.state;
    api.sendVote(space, id, direction);
    let data = articleComments.map(comment => {
      if (id === comment._id)
        direction === 'up' ? comment.votes++ : comment.votes--;
      return comment;
    });
    this.setState({
      articleComments: data
    });
  };

  handleDeleteComment = async id => {
    const { articleComments } = this.state;
    api.deleteComment(id);
    let index = articleComments.reduce((acc, val, i) => {
      if (val._id === id) acc = i;
      return acc;
    }, 0);
    articleComments.splice(index, 1);
    this.setState({
      articleComments
    });
  };

  handleAddComment = async (commentBody, articleId, userDetails) => {
    const { articleComments } = this.state;
    const {
      data: { newCommentDoc }
    } = await api.postComment(this.state.commentBody, articleId, userDetails);
    articleComments.unshift({
      _id: newCommentDoc._id,
      body: newCommentDoc.body,
      created_at: newCommentDoc.created_at,
      created_by: {
        _id: userDetails._id,
        username: userDetails.username
      },
      votes: newCommentDoc.votes
    });
    this.setState({
      articleComments
    });
  };
}

export default CommentInfo;
