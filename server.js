// defining enviroment config
require('dotenv').config({ path: 'config/.env' });
const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  expressSession = require('express-session'),
  fileUpload = require('express-fileupload'),
  fs = require('fs'),
  cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(bodyParser.json({ limit: '5mb' }));

// use of cors to handle the issues with Access-Control-Allow-Origin
cors(app);
app.use(cors());
app.options('*', cors());

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.DB_HOST + process.env.DB_COLLECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log(`Could not connect to the database. Error: ${err}`);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome, if you are reading this, it means that I`m working :) '
  });
});

// require postagens routes
require('./app/routes/publication.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Listen on Port ${process.env.SERVER_PORT}`);
});
