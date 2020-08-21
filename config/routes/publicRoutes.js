const publicRoutes = {
  'GET /user': 'UserController.register',
  'GET /register': 'UserController.register', // alias for GET /user
  'GET /login': 'UserController.login',
  'GET /validate': 'UserController.validate',
  'GET /users': 'UserController.getAll',
  
  'GET /tweet': 'TweetController.postTweet',
};

module.exports = publicRoutes;
