const Tweet = require('../models/Tweet');
// const authService = require('../services/auth.service');
const { ENDPOINT } = require('../../config/connection');
const request = require('request');


const TweetController = () => {
  const postTweet = async (req, res) => {
    const { userid, password, tweet } = req.body;

    if (!userid || !password || !tweet) {
      return res.status(400).json({ msg: 'bad request! Missing parameters' });
    }

    const options = {
      method: 'GET',
      url: `${ENDPOINT}/login`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        password,
        userid,
      },
    };
    request(options, async (error, response) => {
      if (error) throw new Error(error);
      // console.log(response.body);
      const { statusCode, body } = response;
      if (statusCode === 200) {
        try {
          const tweetEntry = await Tweet.create({
            userid,
            tweet,
          });
          return res.status(200).json({ tweetEntry });
        } catch (err) {
          return res.status(500).json({ err });
        }
      }
      return res.status(statusCode).json(JSON.parse(body));
    });
    return res.status(400).json({ err: 'Bad request!!' });
  };
  const getAllTweets = async (req, res) => {
    const { userid } = req.body;
    let allTweets;

    if (!userid) {
      return res.status(400).json({ msg: 'bad request! Missing parameters' });
    }

    try {
      if (userid) {
        allTweets = await Tweet
          .findAll({
            where: {
              userid,
            },
          });
      } else {
        allTweets = await Tweet.findAll();
      }
      return res.status(200).json({ allTweets });
    } catch (err) {
      return res.status(500).json({ err });
    }
  };
  const postComment = async (req, res) => {
    const {
      userid, password, tweetid, comment,
    } = req.body;
    // let statusCode;

    if (!userid || !password || !tweetid || !comment) {
      return res.status(400).json({ msg: 'bad request! Missing parameters' });
    }

    try {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/login`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          password,
          userid,
        },
      };
      request(options, async (error, response) => {
        if (error) return res.status(400).json({ error });
        const { statusCode, body } = response;
        if (statusCode === 200) {
          const findTweet = await Tweet
            .findOne({
              where: {
                id: tweetid,
              },
            });
          if (!findTweet) {
            return res.status(400).json({ msg: 'Bad Request. Tweet not found!!' });
          }
          const postedComment = await Tweet.create({
            userid,
            parent: tweetid,
            tweet: comment,
          });
          return res.status(200).json({ postedComment });
        }
        return res.status(statusCode).json({ body });
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
    return res.status(400).json({ err: 'Bad request!!' });
  };

  const getThread = async (req, res) => {
    const { tweetid } = req.body;
    try {
      const tweet = await Tweet.findOne({
        where: {
          id: tweetid,
        },
      });
      const comments = await Tweet.findAll({
        where: {
          parent: tweetid,
        },
      });
      if (!tweet) {
        return res.status(400).json({ err: 'Bad request! no tweet found!' });
      }
      return res.status(200).json({ tweet, comments });
    } catch (err) {
      res.status(500).json({ err });
    }
    return res.status(400).json({ err: 'Bad request!!' });
  };
  return {
    postTweet,
    postComment,
    getAllTweets,
    getThread,
  };
};

module.exports = TweetController;
