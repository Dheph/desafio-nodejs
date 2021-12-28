const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const dbConfig = require('./app/config/db.config');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
  res.send('server on');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

console.log('db connection started...')
db.mongoose
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to mongo');
  })
  .catch((err) => {
    console.log('Connection error', err);
    process.exit();
  });
