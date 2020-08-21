const User = require('../models/User');
const Tweet = require('../models/Tweet');
const UserController = require('../controllers/UserController');
const authService = require('../services/auth.service');
const http = require('http');
const queryString = require('query-string');
var request = require('request');


const TweetController = () => {
  const postTweet = async (req, res) => {
    const { userid, password, tweet } = req.body;
	
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/login',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'password': 'mypasswordwhichissecure',
		'userid': 'myusername'
	  }
	};
	request(options, function (error, response) {
	  if (error) {
		  throw new Error(error);
		  // return res.status(500).json({error});
	  }
	  console.log(JSON.parse(response.body));
	  return res.status(200).json( {userid, tweet} );
	});

  };

  return {
    postTweet
  };
};

module.exports = TweetController;
