const User = require('../models/User');
const authService = require('../services/auth.service');
// const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  const register = async (req, res) => {
    const { userid, password } = req.body;

    try {
      const user = await User.create({
        userid,
        password,
      });
      const token = authService().issue({ id: user.id });
      return res.status(200).json({ token, user });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const login = async (req, res) => {
    const { userid, password } = req.body;

    if (userid && password) {
      try {
        const user = await User
          .findOne({
            where: {
              userid,
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }
        if (password === user.password) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Something is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const profile = async (req, res) =>{
	  const {userid} = req.body;
	  try{
		const user = await User.findOne({
			where: {
				userid
			},
		});
		if (!user)
			return res.status(400).json({err: 'Bad request! user not found!'});
		return res.status(200).json(user);
	  } catch(err){
		  return res.status(500).json({ err });
	  }
  };
  return {
    register,
    login,
    validate,
    getAll,
	profile
  };
};

module.exports = UserController;
