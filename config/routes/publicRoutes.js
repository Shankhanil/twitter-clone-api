const publicRoutes = {
  'GET /user': 'UserController.register',
  'GET /register': 'UserController.register', // alias for GET /user
  'GET /login': 'UserController.login',
  'GET /validate': 'UserController.validate',
  'GET /users': 'UserController.getAll',
  'GET /profile': 'UserController.profile',
  'GET /follow': 'UserController.follow',

  'GET /tweet': 'TweetController.postTweet',
  'GET /alltweets': 'TweetController.getAllTweets',
  'GET /comment': 'TweetController.postComment',
  'GET /thread': 'TweetController.getThread',


  'GET /seed': 'SeedController.seed',

};

module.exports = publicRoutes;
