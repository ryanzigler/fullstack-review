const axios = require('axios');
const config = require('../config.js');

/* This function should send the username input from the client to GitHub's API and return all repos for that username */
let getReposByUsername = (username) => {

  /* Creates (and returns) a new promise for the async API query */
  return new Promise((resolve, reject) => {

    /* The options object has been provided to help you out, but you'll have to fill in the URL */
    let options = {
      url: `https://api.github.com/users/${username}/repos?per_page=150`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };

    /* Uses an axios module to request repos (and return the results) for a specific user from the GitHub API */
    return axios.get(options.url, {headers: options.headers})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getReposByUsername = getReposByUsername;