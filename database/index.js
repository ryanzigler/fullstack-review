const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Creates the table schema in mongoose
let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  userLogin: String,
  repoName: String,
  starCount: Number,
  repoURL: String
});

// Creates a new instance of the table schema above
let Repo = mongoose.model('Repo', repoSchema);

/* This function should assign the data fields received from the GitHub API request to the proper fields in the database and then insert (save) the repos to the database */
let save = (repo) => {

  const newRepo = new Repo({
    id: repo.id,
    userLogin: repo.owner.login,
    repoName: repo.name,
    starCount: repo.stargazers_count,
    repoURL: repo.html_url
  }).save((err, data) => {
    if (err) {
      //console.log(err, 'Error saving data');
      return;
    } /* else {
      console.log('Success saving data');
    } */
  });
};

/* This function should find, sort (by starCount in descending order), and limit the query to the top 25 results. exec() is required to run the chained query */
let topRepos = () => {
  return Repo.find({}).sort('-starCount').limit(25).exec();
};


module.exports.save = save;
module.exports.topRepos = topRepos;


