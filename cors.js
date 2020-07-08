'use strict';

let cors = app => {
  const cors = require('cors');
  var whitelist = ['http://localhost:3000', 'localhost:3000'];
  const corsOptions = {
    origin: (origin, callback) => {
      console.log(process.env.CORS_WHITELIST);
      if (whitelist.split(' ').indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS configuration'));
      }
    },
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE'
  };
  const publicOptions = {
    origin: (origin, callBack) => {
      callback(null, true);
    },
    method: 'GET'
  };

  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
  app.use(cors(publicOptions));
};

module.exports = cors;
