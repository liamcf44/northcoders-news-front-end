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
    if (this.props.match.url !== prevProps.match.url)
      try {
        const commentData = await api.fetchCommentData(id);
        this.setState({
          articleComments: commentData
        });
      } catch (err) {
        this.props.history.push(`/error`);
      }
  };

  render() {
    const { articleComments } = this.state;
    const { userDetails, articleID } = this.props;

    articleComments.sort((a, b) => {
      return b.created_at - a.created_at;
    });

    return (
      <div className="container-fluid mh-40">
        <div className="row justify-content-center">
          <h4>{articleComments.length} Comments</h4>
        </div>
        <br />

        <div className="row justify-content-center">
          <input
            placeholder="Add a comment here"
            name="commentBody"
            onChange={handleInput.bind(this)}
          />
          <button
            id="button"
            type="button"
            className="btn btn-dark"
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
        <br />
        <div className="row align-items-center">
          {articleComments.map(comment => {
            return (
              <div
                className="container-fluid border-bottom border-dark"
                key={comment._id}
              >
                <br />
                <br />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="font-weight-bold">
                      {comment.created_by.username}:
                    </h6>
                  </div>
                  <div className="col-sm-9">
                    <span>{comment.body}</span>
                  </div>
                </div>
                <div className="row row justify-content-end">
                  <div className="col-sm-6 align-self-end">
                    <span>
                      Created at:{' '}
                      {moment(comment.created_at).format(
                        'MMMM Do YYYY, h:mm:ss'
                      )}
                    </span>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-sm-4 align-self-center">
                    <span>Votes: {comment.votes}</span>
                  </div>
                  <div className="col-sm-8">
                    <span>
                      <i
                        className="far fa-arrow-alt-circle-up fa-2x"
                        onClick={() =>
                          this.handleVotes('comment', comment._id, 'up')
                        }
                      />

                      <i
                        className="far fa-arrow-alt-circle-down fa-2x"
                        onClick={() =>
                          this.handleVotes('comment', comment._id, 'down')
                        }
                      />
                    </span>
                  </div>
                </div>
                <br />
                {comment.created_by._id === userDetails._id && (
                  <div className="row">
                    <button
                      id="button"
                      type="button"
                      className="btn btn-dark"
                      onClick={() => this.handleDeleteComment(comment._id)}
                    >
                      Delete Comment
                    </button>
                  </div>
                )}
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  handleVotes = (space, id, direction) => {
    const { articleComments } = this.state;

    try {
      api.sendVote(space, id, direction);
      let data = articleComments.map(comment => {
        if (id === comment._id)
          direction === 'up' ? comment.votes++ : comment.votes--;
        return comment;
      });
      this.setState({
        articleComments: data
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  handleDeleteComment = async id => {
    const { articleComments } = this.state;
    try {
      api.deleteComment(id);
      let index = articleComments.reduce((acc, val, i) => {
        if (val._id === id) acc = i;
        return acc;
      }, 0);
      articleComments.splice(index, 1);
      this.setState({
        articleComments
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  handleAddComment = async (commentBody, articleId, userDetails) => {
    const { articleComments } = this.state;
    try {
      let {
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
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };
}

export default CommentInfo;
