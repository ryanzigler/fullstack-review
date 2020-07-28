const express = require('express');
const bodyParser = require('body-parser');
const fetchRepos = require('../helpers/github.js');
const dbSave = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  let saveRepos = repos => repos.forEach(db.save);
  fetchRepos.getReposByUsername(req.body, saveRepos);
  res.status(200).send('repos posted!');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

