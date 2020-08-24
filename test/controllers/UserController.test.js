const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('User | create', async () => {
  let res = await request(api)
    .get('/user')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.user).toBeTruthy();

  const user = await User.findByPk(res.body.user.id);

  expect(user.id).toBe(res.body.user.id);
  expect(user.userid).toBe(res.body.user.userid);

  // no available userid
  res = await request(api)
    .get('/user')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
    })
    .expect(400);

  // null password or username
  res = await request(api)
    .get('/user')
    .set('Accept', /json/)
    .send({
      userid: '',
      password: '',
    })
    .expect(400);


  await user.destroy();
});

test('User | login', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  let res = await request(api)
    .get('/login')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  expect(user).toBeTruthy();

  // test for wrong password
  res = await request(api)
    .get('/login')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
      password: 'wrongpassword',
    })
    .expect(401);

  // test for un-regsitered username
  res = await request(api)
    .get('/login')
    .set('Accept', /json/)
    .send({
      userid: 'someunknownuser',
      password: 'somepassword',
    })
    .expect(400);

  await user.destroy();
});

test('User | get all ', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  const res = await request(api)
    .get('/login')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  const res2 = await request(api)
    .get('/users')
    .set('Accept', /json/)
    .expect(200);

  expect(res2.body.users).toBeTruthy();
  expect(res2.body.users.length).toBe(1);

  await user.destroy();
});

test('User | profile ', async () => {
  const user = await User.create({
    userid: 'someuser',
    password: 'securepassword',
  });

  let res = await request(api)
    .get('/profile')
    .set('Accept', /json/)
    .send({
      userid: 'someuser',
    })
    .expect(200);

  expect(res.body.userid).toBeTruthy();
  expect(res.body.password).toBeFalsy();
  expect(res.body.userid).toBe('someuser');

  res = await request(api)
    .get('/profile')
    .set('Accept', /json/)
    .send({
      userid: 'someunknownuser',
    })
    .expect(400);

  await user.destroy();
});

