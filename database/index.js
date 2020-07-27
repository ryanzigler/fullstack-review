const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


let repoSchema = mongoose.Schema({
  id: Number,
  username: String,
  repoName: String,
  stars: Number,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  const newRepo = new Repo({
    id: repo.id,
    username: repo.username,
    repo: repo.repoName,
    stars: repo.stars,
    url: repo.url
  }).save((err, data) => {
    if (err) {
      console.log(err, 'Error saving data');
    } else {
      console.log('Success saving data');
    }
  });
  // This function should save a repo or repos to
  // the MongoDB
};

module.exports.save = save;