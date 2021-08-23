const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 4000);

const api = require('./api');
const createDummy = require('./createDummy'); // 더미 데이터 생성
const jwtMiddleware  = require('./lib/jwtMiddleware');

try {
  fs.readdirSync('uploads');
} catch (err) {
  fs.mkdirSync('uploads');
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
    createDummy(); // 더미 데이터 생성
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
// app.use(express.static('public')));
app.use('/images', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(jwtMiddleware);

app.use('/api', api);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
