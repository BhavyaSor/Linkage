const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const port = process.env.PORT || 8000;
const dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_MONGO_URI
    : 'mongodb://127.0.0.1:27017/Linkage';
const app = express();

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log('Connected to database');
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user'));
app.use('/api/linkage', require('./routes/linkage'));

app.get('/', (req, res) =>
  res.status(200).end('Hello! Welcome to Linkage API')
);

app.get('*', (req, res) => res.status(404).end('Requested Page not found'));

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
