## \***\*\*\*\*\***\*\***\*\*\*\*\*** NORTHCODERS NEWS Front End \***\*\*\*\*\***\*\***\*\*\*\*\***

A portfolio project for Northcoders in which a React front end is built, which interacts with the MongoDB back end build earlier. This front end displays a news site which allows you to choose articles by topic, these and the respective comments can then be voted on. You can also add a new article and a a new comment to an article.

This front end is then hosted on Heroku.


### GETTING STARTED

You will need to run the following to recreate this project:

Fork and clone the repository;

`https://github.com/liamcf44/FE-FT-NC-News.git`

You need to install node, instructions for this can be found at `https://nodejs.org/en/download/package-manager/`.

You will also need to install React, instructions for this can be found at `https://reactjs.org/docs/try-react.html`

Running `npm install` will then install the dependencies needed. These are listed below.

### ENDPOINTS

The front end works off a number of endpoints listed below.

#### /

This will take you to the homepage of the app.

#### /articles/:topic

This will display the articles available, filtered by topic. The current available topics are Coding, Football and Cooking.

#### /articles:articleid

This endpoint will take you to a specific article by id. From this page you can vote on the article as well as view its respective comments which can also be voted on.

#### /addArticle

This page allows you to add a new article with a title, body and a topic. The article is then displayed on the respective topic page.

#### /error

This is the page that is displayed if an error occurs

### HEROKU

This API is hosted on Heroku using API calls to the back end which is also hosted on Heroku. You can do the same by setting up an account at 'heroku.com'

This backend API can be found at the following Heroku link, `https://stormy-meadow-76642.herokuapp.com/` and it's git link is `https://git.heroku.com/stormy-meadow-76642.git`

### BUILT WITH

The following dependencies were used to build the app:

* React v16.4.0
* React-Dom v16.4.0
* React-Router-Dom v4.3.1
* React-Scripts v1.1.4
* Axios v0.18.0
* Bootstrap 4.1.1
* Moment 2.22.2

### AUTHORS

Liam Freeman:

* Email: liamcf44@protonmail.com
* GitHub: liamcf44
