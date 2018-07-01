import React, { Component } from 'react';
import handleInput from '../utils/HandleInput';
import * as api from '../api';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    topicData: []
  };

  componentDidMount = async () => {
    try {
      let { topics } = await api.fetchTopicData();
      this.setState({
        topicData: topics
      });
    } catch (err) {
      this.props.history.push(`/error`);
    }
  };

  render() {
    const { title, body, topic, topicData } = this.state;
    const { user } = this.props;
    return (
      <div className="container-fluid" id="addArticleForm">
        <div className="row justify-content-center">
          <h3 id="subTitle">Add an Article!</h3>
          <br />
        </div>
        <div className="row-fluid justify-content-center">
          <form>
            <div className="form-group">
              <label htmlFor="inputTitle">Title:</label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                aria-describedby="titleHelp"
                placeholder="Enter Title"
                name="title"
                onChange={handleInput.bind(this)}
              />
              <small id="titleHelp" className="form-text text-muted">
                What will be the title of your article?
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputBody">Article Body:</label>
              <textarea
                type="text"
                className="form-control"
                id="inputBody"
                aria-describedby="bodyHelp"
                placeholder="Enter Your Article Here"
                rows="7"
                name="body"
                onChange={handleInput.bind(this)}
              />
              <small id="bodyHelp" className="form-text text-muted">
                Put the content of your article here....
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="topicSelect">Select a Topic</label>
              <select
                className="form-control"
                id="topicSelect"
                name="topic"
                onChange={handleInput.bind(this)}
              >
                <option defaultValue disabled>
                  Choose a topic
                </option>
                <option value="coding" id="coding">
                  Coding
                </option>
                <option value="football" id="football">
                  Football
                </option>
                <option value="cooking" id="cooking">
                  Cooking
                </option>
              </select>
            </div>
            <button
              id="button"
              type="submit"
              className="btn btn-dark"
              onClick={e =>
                this.handleNewArticle(
                  e,
                  title,
                  body,
                  topic,
                  user._id,
                  topicData
                )
              }
            >
              Add your article
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleNewArticle = async (e, title, body, topic, userid, topicData) => {
    if (title === '' || body === '' || topic === '') {
      alert('Please complete all fields on the form the add an article');
    } else {
      try {
        let docs = await api.addArticle(
          e,
          title,
          body,
          topic,
          userid,
          topicData
        );
        let id = docs.data.newArticleDoc._id;
        this.props.history.push(`/articles/${topic}/${id}`);
      } catch (err) {
        this.props.history.push(`/error`);
      }
    }
  };
}

export default AddArticle;
