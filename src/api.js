import axios from 'axios';

const url = 'https://github.com/liamcf44/northcoders-news-back-end/api';

export const fetchArticleData = async () => {
  let { data } = await axios
    .get(`${url}/articles`)
    .catch(err => console.log(err));
  return data;
};

export const fetchIndividualArticleData = async id => {
  const {
    data: { result }
  } = await axios.get(`${url}/articles/${id}`).catch(err => console.log(err));
  return result[0];
};

export const fetchCommentData = async id => {
  const {
    data: { comments }
  } = await axios
    .get(`${url}/articles/${id}/comments`)
    .catch(err => console.log(err));
  return comments;
};

export const sendVote = (space, id, direction) => {
  if (space === 'comment') {
    axios
      .put(`${url}/comments/${id}?vote=${direction}`)
      .catch(err => console.log(err));
  } else if (space === 'article') {
    axios
      .put(`${url}/articles/${id}?vote=${direction}`)
      .catch(err => console.log(err));
  }
};

export const postComment = (commentBody, articleId, userDetails) => {
  return axios
    .post(`${url}/articles/${articleId}/comments`, {
      body: commentBody,
      belongs_to: articleId,
      created_by: userDetails._id
    })
    .then(res => res)
    .catch(function(error) {
      console.log(error);
    });
};

export const fetchTopicData = async () => {
  let { data } = await axios
    .get(`${url}/topics`)
    .catch(err => console.log(err));
  return data;
};

export const deleteComment = async id => {
  axios.delete(`${url}/comments/${id}`).catch(function(error) {
    console.log(error);
  });
};

export const addArticle = async (e, title, body, topic, userID, topicData) => {
  e.preventDefault();
  const topicID = topicData.reduce((acc, val) => {
    if (val.slug === topic) {
      return (acc = val._id);
    }
    return acc;
  }, '');

  return axios
    .post(`${url}/topics/${topicID}/articles`, {
      title: title,
      body: body,
      belongs_to: topicID,
      created_by: userID
    })
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
    });
};
