const express = require('express');
// See app.use below for more info on bodyParser
const bodyParser = require('body-parser');
// Required to complete the GitHub API request
const github = require('../helpers/github.js');
// Required to save and load from the database
const database = require('../database/index.js');
let app = express();

// bodyParser is required to parse the req.body property of req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

/* This route should receive the POST req from the client, forward the username to the GitHub API, and then save the request of the API request to the database */
app.post('/repos', function (req, res) {
  var username = req.body.data.username;

  github.getReposByUsername(username)
    .then((repos) => {
      repos.forEach((repo) => {
        database.save(repo);
      });
      res.status(201).send('Query saved in database');
    })
    .catch((err) => {
      //console.log('error in app.post (server/index.js)');
      res.status(500).json(err);
    });
});

/* This route should send the top 25 repos to the client for rendering */
app.get('/repos', function (req, res) {

  database.topRepos()
    .then((repos) => {
      //console.log(repos, 'topRepos from db');
      res.status(200).json(repos);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


// Uncomment the console.log below for port to be displayed on initialization.
const PORT = process.env.PORT || 1128;

app.listen(PORT, function() {
  console.log(`listening on port ${ PORT }`);
});

