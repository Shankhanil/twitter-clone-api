var request = require('request');

const SeedController = () => {
  const seed = async (req, res) => {
	// register 2 users
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/user',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'userid': 'thisismyuserid',
		'password': 'mypasswordwhichissecure',
	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	});
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/user',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'userid': 'thisismyuserid2',
		'password': 'mypasswordwhichissecure2',
	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	});
	// tweet from user #1
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/tweet',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'userid': 'thisismyuserid',
		'password': 'mypasswordwhichissecure',
		'tweet': 'this is my first tweet',

	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	});
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/comment',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'userid': 'thisismyuserid2',
		'password': 'mypasswordwhichissecure2',
		'tweetid': 1,
		'comment': 'this is my first comment'
	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	});
	var options = {
	  'method': 'GET',
	  'url': 'http://localhost:2017/comment',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'userid': 'thisismyuserid',
		'password': 'mypasswordwhichissecure',
		'tweetid': 1,
		'comment': 'this is my second comment'
	  }
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
	});
	
	return res.status(200).json({msg: "done"});
  };
  
  return {
    seed
  };
};

module.exports = SeedController;
