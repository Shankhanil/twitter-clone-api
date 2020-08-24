const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');

let user;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });
});

test('User is created correctly', async () => {
  const sendUser = user.toJSON();
  // check if user is created
  expect(user.userid).toBe('someuser');
  // check if password is not send to browser
  expect(sendUser.password).toBeFalsy();
  await user.destroy();
});
