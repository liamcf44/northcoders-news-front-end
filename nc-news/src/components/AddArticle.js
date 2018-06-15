import React, { Component } from 'react';
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
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3>Add an Article!</h3>
          <br />
        </div>
        <div className="row justify-content-start">
          <div className="col-sm-8 align-self-start">
            <form>
              <div className="form-group">
                <label for="inputTitle">Title:</label>
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
                <label for="inputBody">Article Body:</label>
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
                <label for="topicSelect">Select a Topic</label>
                <select
                  className="form-control"
                  id="topicSelect"
                  name="topic"
                  onChange={handleInput.bind(this)}
                >
                  <option selected disabled>
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
                type="submit"
                className="btn btn-primary"
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
      </div>
    );
  }

  handleNewArticle = async (e, title, body, topic, userid, topicData) => {
    const docs = await api.addArticle(e, title, body, topic, userid, topicData);
    const id = docs.data.newArticleDoc._id;
    this.props.history.push(`/articles/${topic}/${id}`);
  };
}

export default AddArticle;
