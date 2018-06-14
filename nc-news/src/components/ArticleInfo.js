import React, { Component } from 'react';
import * as api from '../api';
import AddComment from './AddComment';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {},
    articleComments: {}
  };

  componentDidMount = async () => {
    const id = this.props.match.params.articleid;

    const articleData = await api.fetchIndividualArticleData(id);
    const commentData = await api.fetchCommentData(id);

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
    console.log('rendering');
    const { result: articleResult } = this.state.selectedArticle;
    const { comments: commentResult } = this.state.articleComments;
    if (!articleResult) return <p>loading....</p>;
    else {
      return (
        <section className="articleInfo">
          <div className="articleContent">
            <h4>{articleResult[0].title}</h4>
            <h5>Created by: {articleResult[0].created_by.username}</h5>
            <p>Votes: {articleResult[0].votes}</p>
            <span>
              <i
                className="far fa-arrow-alt-circle-up"
                onClick={() =>
                  api.handleVotes('article', articleResult[0]._id, 'up')
                }
              />
              <i
                className="far fa-arrow-alt-circle-down"
                onClick={() =>
                  api.handleVotes('article', articleResult[0]._id, 'down')
                }
              />
            </span>
            <p>{articleResult[0].body}</p>
          </div>
          <br />
          <h4>{commentResult.length} Comments</h4>
          <AddComment
            articleId={articleResult[0]._id}
            userDetails={this.props.userDetails}
          />
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
                      onClick={() =>
                        api.handleVotes('comment', comment._id, 'up')
                      }
                    />
                    <i
                      className="far fa-arrow-alt-circle-down"
                      onClick={() =>
                        api.handleVotes('comment', comment._id, 'down')
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
}

export default ArticleInfo;
