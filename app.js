import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { router as loginRouter } from './routers/login.js';
import { router as crudRouter } from './routers/crud.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set('port', PORT || 3000);

// mongoDB connect

class mongoDataBase {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async connect() {
    try {
      this.connection = mongoose.connect(this.uri, {
        dbName: this.dbName,
      });
      console.log('몽고디비 연결 성공!!');
    } catch (err) {
      console.error('몽고디비 연결 에러', err);
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const dataBase = new mongoDataBase(MONGODB_URI, DB_NAME);

dataBase.connect();

// DB connected

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', loginRouter);
app.use('/', crudRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
