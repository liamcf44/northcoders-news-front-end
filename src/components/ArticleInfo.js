import React, { Component } from 'react';
import * as api from '../api';
import CommentInfo from './CommentInfo';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {}
  };

  componentDidMount = async () => {
    const id = this.props.match.params.articleid;

    try {
      let articleData = await api.fetchIndividualArticleData(id);
      this.setState({
        selectedArticle: articleData
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  componentDidUpdate = async prevProps => {
    const id = this.props.match.params.articleid;
    if (this.props.match.url !== prevProps.match.url)
      try {
        const articleData = await api.fetchIndividualArticleData(id);
        this.setState({
          selectedArticle: articleData
        });
      } catch (err) {
        this.props.history.push(`/error`);
      }
  };

  render() {
    const { selectedArticle } = this.state;
    const { userDetails } = this.props;
    if (!selectedArticle.created_by)
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <i className="fas fa-spinner fa-3x" />
          </div>
        </div>
      );
    else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-sm-8">
              <div className="row justify-content-center">
                <h3>{selectedArticle.title}</h3>
              </div>

              <br />
              <div className="row justify-content-center">
                <h5>Created by: {selectedArticle.created_by.username}</h5>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-sm-3 align-self-center">
                  <span>Votes: {selectedArticle.votes}</span>
                </div>
                <div className="col-sm-9">
                  <span>
                    <i
                      className="far fa-arrow-alt-circle-up fa-2x"
                      onClick={() =>
                        this.handleVotes('article', selectedArticle._id, 'up')
                      }
                    />

                    <i
                      className="far fa-arrow-alt-circle-down fa-2x"
                      onClick={() =>
                        this.handleVotes('article', selectedArticle._id, 'down')
                      }
                    />
                  </span>
                </div>
              </div>
              <br />
              <br />
              <div className="row justify-content-start">
                <p>{selectedArticle.body}</p>{' '}
              </div>
            </div>
            <div className="col-sm-4">
              <CommentInfo
                {...this.props}
                userDetails={userDetails}
                articleID={selectedArticle._id}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  handleVotes = (space, id, direction) => {
    try {
      const { selectedArticle } = this.state;
      api.sendVote(space, id, direction);
      this.setState({
        selectedArticle: {
          ...selectedArticle,
          votes:
            direction === 'up'
              ? selectedArticle.votes + 1
              : selectedArticle.votes - 1
        }
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };
}

export default ArticleInfo;
