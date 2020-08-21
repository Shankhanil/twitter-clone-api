const publicRoutes = {
  'GET /user/:userid/:password': 'UserController.register',
  'GET /register/:userid/:password': 'UserController.register', // alias for GET /user
  'GET /login/:userid/:password': 'UserController.login',
  'GET /validate/:token': 'UserController.validate',
  'GET /users': 'UserController.getAll',

  'GET /bookcab': 'UserController.bookcab',
  'GET /bookdetails': 'UserController.bookdetails',

};

module.exports = publicRoutes;
