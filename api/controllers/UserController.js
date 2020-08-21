const User = require('../models/User');
const Cab = require('../models/Cab');
const authService = require('../services/auth.service');
// const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  const register = async (req, res) => {
    const { userid, password } = req.params;

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
    const { userid, password } = req.params;

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
    const { token } = req.params;

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

  const bookcab = async (req, res) => {
    const {
      userid, password, locA, locB,
    } = req.body;

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

          return res.status(200).json({
            token,
            user,
            bookingDetail: {
              start: locA,
              end: locB,
              bookingID: user.id,
            },
          });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Something went wrong' });
  };
  const bookdetails = async (req, res) => {
    const { userid } = req.body;
    try {
      const cabdetails = await Cab.findAll({
        where: {
          userid,
        },
      });

      return res.status(200).json({ cabdetails });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    register,
    login,
    validate,
    getAll,
    bookcab,
    bookdetails,
  };
};

module.exports = UserController;
