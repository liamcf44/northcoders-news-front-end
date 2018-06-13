import React, { Component } from 'react';
import axios from 'axios';

class AddComment extends Component {
  state = {
    commentBody: ''
  };

  render() {
    return (
      <div>
        <input
          placeholder="Add a comment here"
          value={this.state.commentBody}
          onChange={this.handleInput}
        />
        <button onClick={this.postComment}>Add comment</button>
      </div>
    );
  }

  handleInput = ({ target: { value } }) => {
    console.log(value);
    this.setState({
      commentBody: value
    });
  };

  postComment = () => {
    const { articleId, userDetails } = this.props;
    axios
      .post(
        `https://liamcf44-northcoders-news.herokuapp.com/api/articles/${articleId}/comments`,
        {
          body: this.state.commentBody,
          belongs_to: articleId,
          created_by: userDetails._id
        }
      )
      .then(function(response) {
        this.setState({
          commentBody: ''
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export default AddComment;
