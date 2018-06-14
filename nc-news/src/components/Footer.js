import React from 'react';
import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <section className="footer">
      <span>
        <Link to="/addArticle">
          <button className="addArticleButton">Add an Article</button>
        </Link>
        <p className="liam">Created by Liam Freeman</p>
      </span>
    </section>
  );
};

export default footer;
