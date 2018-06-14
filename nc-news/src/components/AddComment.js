import React, { Component } from 'react';
import * as api from '../api';
import handleInput from './HandleInput';

class AddComment extends Component {
  state = {
    commentBody: ''
  };

  render = () => {
    const { articleId, userDetails } = this.props;

    return (
      <div>
        <input
          placeholder="Add a comment here"
          name="commentBody"
          onChange={handleInput.bind(this)}
        />
        <button
          onClick={() =>
            api.postComment(this.state.commentBody, articleId, userDetails)
          }
        >
          Add comment
        </button>
      </div>
    );
  };
}

export default AddComment;
