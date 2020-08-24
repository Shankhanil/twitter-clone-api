const request = require('request');
const { ENDPOINT } = require('../../config/connection');

const SeedController = () => {
  const seed = async (req, res) => {
    // register 2 users
    let options = {
      method: 'GET',
      url: `${ENDPOINT}/user`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        userid: 'thisismyuserid',
        password: 'mypasswordwhichissecure',
      },
    };
    request(options, (error) => {
      if (error) throw new Error(error);
    });
    options = {
      method: 'GET',
      url: `${ENDPOINT}/user`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        userid: 'thisismyuserid2',
        password: 'mypasswordwhichissecure2',
      },
    };
    request(options, (error) => {
      if (error) throw new Error(error);
    });
    // tweet from user #1
    options = {
      method: 'GET',
      url: `${ENDPOINT}/tweet`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        userid: 'thisismyuserid',
        password: 'mypasswordwhichissecure',
        tweet: 'this is my first tweet',
      },
    };
    request(options, (error) => {
      if (error) throw new Error(error);
    });
    options = {
      method: 'GET',
      url: `${ENDPOINT}/comment`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        userid: 'thisismyuserid2',
        password: 'mypasswordwhichissecure2',
        tweetid: 1,
        comment: 'this is my first comment',
      },
    };
    request(options, (error) => {
      if (error) throw new Error(error);
    });
    options = {
      method: 'GET',
      url: `${ENDPOINT}/comment`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        userid: 'thisismyuserid',
        password: 'mypasswordwhichissecure',
        tweetid: 1,
        comment: 'this is my second comment',
      },
    };
    request(options, (error) => {
      if (error) throw new Error(error);
    });

    return res.status(200).json({ msg: 'done' });
  };

  return {
    seed,
  };
};

module.exports = SeedController;
