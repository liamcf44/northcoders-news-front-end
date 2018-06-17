import React from 'react';

const HomePage = () => {
  return (
    <div className="text-center">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-around">
        <div className="inner cover align-self-center">
          <h1 className="cover-heading">Welcome to NC-News!</h1>
          <br />
          <br />
          <br />
          <h4>
            Please choose a topic from the nav-bar above to begin browsing
            articles, or select the add article button to add a new article!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
