import React, { Component } from 'react';
import * as api from '../api';
import CommentInfo from './CommentInfo';

class ArticleInfo extends Component {
  state = {
    selectedArticle: {}
  };

  componentDidMount = async () => {
    const id = this.props.match.params.articleid;

    const articleData = await api.fetchIndividualArticleData(id);

    this.setState({
      selectedArticle: articleData
    });
  };

  componentDidUpdate = async prevProps => {
    const id = this.props.match.params.articleid;
    if (this.props.match.url !== prevProps.match.url) {
      const articleData = await api.fetchIndividualArticleData(id);
      this.setState({
        selectedArticle: articleData
      });
    }
  };

  render() {
    const { selectedArticle } = this.state;
    const { userDetails } = this.props;
    if (!selectedArticle._id) return <p>loading....</p>;
    else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-around">
            <div className="col-sm-7">
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
            <div className="col-sm-3">
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
  };
}

export default ArticleInfo;
