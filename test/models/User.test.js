const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');
const Cab = require('../../api/models/Cab');

let user;
let cab;

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
  cab = await Cab.create({
    userid: 'someuser',
    start: 'loc-1',
    end: 'loc-2',
  });
});

test('User is created correctly', async () => {
  const sendUser = user.toJSON();
  // check if user is created
  expect(user.userid).toBe('someuser');
  // check if password is send to browser
  expect(sendUser.password).toBeTruthy();
  await user.destroy();
});
test('Cab record is created correctly', async () => {
  const sendCab = cab.toJSON();
  expect(cab.userid).toBe('someuser');
  expect(sendCab.start).toBe('loc-1');
  expect(sendCab.end).toBe('loc-2');

  await cab.destroy();
});
