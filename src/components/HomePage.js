import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-around">
        <div className="inner cover align-self-center">
          <h1 className="cover-heading">Welcome to NC-News!</h1>
          <br />
          <br />
          <br />
          <h3>
            NC-News is a visionary news site that lets you read user driven
            content, as well as make your own.
          </h3>
          <br />
          <br />
          <br />
          <h4>
            Please choose a topic from the nav-bar above to begin browsing
            articles, or select the add article button to add a new article!
          </h4>
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-sm-4">
              <Link
                to="/articles/coding"
                className="btn btn-light"
                id="logoButton"
              >
                <i className="fas fa-laptop fa-5x" />
                <br />
                <br />
                <span>
                  <h6>Coding Articles</h6>
                </span>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link
                to="/articles/coding"
                className="btn btn-light"
                id="logoButton"
              >
                <i className="fas fa-futbol fa-5x" />
                <br />
                <br />
                <span>
                  <h6>Football Articles</h6>
                </span>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link
                to="/articles/coding"
                className="btn btn-light"
                id="logoButton"
              >
                <i className="fas fa-utensils fa-5x" />
                <br />
                <br />
                <span>
                  <h6>Cooking Articles</h6>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
