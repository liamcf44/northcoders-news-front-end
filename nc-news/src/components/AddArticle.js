import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import handleInput from './HandleInput';
import * as api from '../api';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    topicData: []
  };

  componentDidMount = async () => {
    const { topics } = await api.fetchTopicData();
    this.setState({
      topicData: topics
    });
  };

  render() {
    const { title, body, topic, topicData } = this.state;
    const { user } = this.props;
    return (
      <section className="addArticle">
        <br />
        <br />
        <h4>Add an Article</h4>
        <form>
          Title:{' '}
          <input type="text" name="title" onChange={handleInput.bind(this)} />
          <br />
          <br />
          Body:{' '}
          <input type="text" name="body" onChange={handleInput.bind(this)} />
          <br />
          <br />
          Topic:
          <br />
          Coding
          <input
            type="radio"
            name="topic"
            value="coding"
            id="coding"
            onChange={handleInput.bind(this)}
          />
          Football
          <input
            type="radio"
            name="topic"
            value="football"
            id="football"
            onChange={handleInput.bind(this)}
          />
          Cooking
          <input
            type="radio"
            name="topic"
            value="cooking"
            id="cooking"
            onChange={handleInput.bind(this)}
          />
          <br />
          <br />
          <button
            onClick={e =>
              this.handleNewArticle(e, title, body, topic, user._id, topicData)
            }
          >
            Add Article
          </button>
        </form>
      </section>
    );
  }

  handleNewArticle = async (e, title, body, topic, userid, topicData) => {
    const docs = await api.addArticle(e, title, body, topic, userid, topicData);
    const id = docs.data.newArticleDoc._id;
    this.props.history.push(`/articles/${topic}/${id}`);
  };
}

export default AddArticle;
