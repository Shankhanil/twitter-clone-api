const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Comment = require('../models/Comment');
const UserController = require('../controllers/UserController');
const authService = require('../services/auth.service');
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
			'password': password,
			'userid': userid
		  }
		};
		request(options, async function (error, response) {
		  if (error) throw new Error(error);
		  console.log(response.body);
		  const {statusCode, body} = response;
		  if (statusCode == 200){
			  try{
				  const tweetEntry = await Tweet.create({
					  userid, 
					  tweet
				  });
				  return res.status(200).json({tweetEntry});
			  } catch(err){
				  return res.status(500).json({err});
			  }
		  }
		  return res.status(statusCode).json( JSON.parse(body) );
		});

	};
	const getAllTweets = async (req, res) =>{
		const { userid } = req.body;
		let allTweets;
		try{
			if (userid){
				allTweets = await Tweet
					.findAll({
					where: {
					  userid,
					},
				});
			}
			else{
				allTweets = await Tweet.findAll();
			}
			return res.status(200).json({allTweets});
		} catch(err){
			return res.status(500).json({err});
		}
	};
	const postComment = async (req, res) =>{
		const { userid, password, tweetid, comment } = req.body;
		let statusCode;
		try{
			
			var options = {
			  'method': 'GET',
			  'url': 'http://localhost:2017/login',
			  'headers': {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			  form: {
				'password': password,
				'userid': userid,
			  }
			};
			request(options, async function (error, response) {
				if (error) return res.status(400).json({error});
				const {statusCode, body} = response;
				if (statusCode == 200){
					const findTweet = await Tweet
						.findOne({
						where: {
						  id : tweetid,
						},
					});
					if (!findTweet){
						return res.status(400).json({msg: "Bad Request. Tweet not found!!"});  
					}
					const postComment = await Comment.create({
						userid,
						tweetid,
						comment
					});
					return res.status(200).json({findTweet, userid, comment});
				}
				return res.status(statusCode).json({body});
			});
		} catch(err){
			return res.status(500).json({err});
		}
		
	};
	
	const getThread = async (req, res) =>{
		const {tweetid} = req.body;
		try{
			const tweet = await Tweet.findOne({
						where: {
						  id : tweetid,
						},
					});
			const comments = await Comment.findAll({
						where: {
						  tweetid,
						},
					});
			if (!tweet){
				return res.status(400).json({err: "Bad request! no tweet found!"});
			}
			return res.status(200).json({ tweet, comments });
		} catch(err){
			res.status(500).json({err});
		}
	};
  return {
    postTweet,
    postComment,
	getAllTweets,
	getThread
  };
};

module.exports = TweetController;
