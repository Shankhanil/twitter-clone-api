# Twitter clone backend API

> Twitter-clone backend REST API with JWT Authentication and support for sqlite, mysql, and postgresql

- authentication via [JWT](https://jwt.io/)
- routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- support for [sqlite](https://www.sqlite.org/), [mysql](https://www.mysql.com/), and [postgresql](https://www.postgresql.org/)
- environments for `development`, `testing`, and `production`
- linting via [eslint](https://github.com/eslint/eslint)
- integration tests running with [Jest](https://github.com/facebook/jest)
- built with [npm sripts](#npm-scripts)

## Use

The endpoints of the API are at https://limitless-anchorage-71184.herokuapp.com/

Routes:

/users   : Displays all available users
/user    : (userid, password) registers a user
/login   : (userid, password) validates a user
/follow  : (userid, password, follow) follows a user
/profile : (userid) displays user profile

/tweet	 : (userid, password, tweet) sends out a Tweet
/comment : (userid, password, tweetid, comment) sends out a comment against a tweet
/thread  : (tweetid) displays the tweet thread

## LICENSE

MIT © Lukas Aichbauer
MIT © Shankhanil
