const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');
const Cab = require('../../api/models/Cab');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('User | create', async () => {
  const res = await request(api)
    .get('/public/user/someuser/securepassword')
    .expect(200);

  expect(res.body.user).toBeTruthy();

  const user = await User.findByPk(res.body.user.id);

  expect(user.id).toBe(res.body.user.id);
  expect(user.userid).toBe(res.body.user.userid);

  await user.destroy();
});

test('User | login', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  const res = await request(api)
    .get('/public/login/someuser/securepassword')
    .expect(200);

  expect(res.body.token).toBeTruthy();

  expect(user).toBeTruthy();

  await user.destroy();
});

test('User | get all (auth)', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  const res = await request(api)
    .get('/public/login/someuser/securepassword')
    .expect(200);

  expect(res.body.token).toBeTruthy();

  const res2 = await request(api)
    .get('/public/users')
    .expect(200);

  expect(res2.body.users).toBeTruthy();
  expect(res2.body.users.length).toBe(1);

  await user.destroy();
});
test('User | Book a cab', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  const res = await request(api)
    .get('/public/bookcab')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
      password: 'securepassword',
      locA: 'location-a',
      locB: 'location-b',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();
  expect(res.body.bookingDetail).toBeTruthy();
  expect(res.body.bookingDetail.bookingID).toBeTruthy();
  expect(res.body.bookingDetail.start).toBe('location-a');
  expect(res.body.bookingDetail.end).toBe('location-b');


  await user.destroy();
});
test('User | Get Bookking details ', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });
  const cab = await Cab.create({
    userid: 'someuser',
    start: 'loc-1',
    end: 'loc-2',
  });
  const cab2 = await Cab.create({
    userid: 'someuser',
    start: 'loc-3',
    end: 'loc-4',
  });

  const res2 = await request(api)
    .get('/public/bookdetails')
    .send({
      userid: 'someuser',
    })
    .expect(200);

  expect(res2.body.cabdetails).toBeTruthy();
  expect(res2.body.cabdetails.length).toBe(2);

  await user.destroy();
  await cab.destroy();
  await cab2.destroy();
});
