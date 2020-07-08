const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const fs = require('fs');

// create a new user
exports.create = (req, res) => {
  // check if user name is not empty
  const userName = req.body.userName,
    userPassword = req.body.password,
    confUserPassword = req.body.confPassword,
    email = req.body.email,
    avatar = req.body,
    json = JSON.stringify(req.body);

  console.log(json);

  if (!userName) {
    return res.status(400).send({
      message: 'User name can not be empty'
    });
  }
  //   check if passwords match
  if (req.body.password !== req.body.confPassword) {
    return res.status(400).send({
      message: 'Passwords are not the same'
    });
  }
  // init mongoose schema
  User.init();
  const newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
    lastUpdate: new Date(),
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: req.body.company,
    address: req.body.address,
    city: req.body.city,
    jobTitle: req.body.jobTitle,
    country: req.body.country,
    zipcode: req.body.zipcode,
    about: req.body.about,
    facebook: req.body.facebook || '',
    twitter: req.body.twitter || '',
    created: new Date()
  });
  //   create new user
  newUser
    .save()
    .then(data => {
      console.log('then => ', data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log('catch => ', err);
      res.status(500).send({
        message: err.message || 'Some error ocurred while creating a new User'
      });
    });
};

// get all users
exports.findAll = (req, res) => {
  User.find()
    .then(user => {
      console.log('Start requisition', user);
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error ocurred while retrieving user'
      });
    });
};
// get a single user
exports.findOne = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}    `
      });
    });
};
// update user
exports.update = (req, res) => {
  // console.log(req.body);
  // res.status(200).send('ok');
  console.log(mongoose.Types.ObjectId(req.params.userId), req.body.password);
  User.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.userId),
    {
      userName: req.body.userName,
      password: req.body.password,
      lastUpdate: new Date(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      address: req.body.address,
      city: req.body.city,
      jobTitle: req.body.jobTitle,
      country: req.body.country,
      zipcode: req.body.zipcode,
      about: req.body.about
    },
    {
      new: true
    }
  )
    .then(user => {
      if (!user) {
        console.log(`User id ${req.params.userId} not found`);
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        console.log(`User id ${req.params.userId} not found`);
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      console.log(`User id ${req.params.userId} not found`, err);
      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}`
      });
    });
};
// delete user
exports.delete = (req, res) => {
  console.log(req.params.userId);
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      res.send({ message: 'User removed successfully' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User id ${req.params.userId} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}    `
      });
    });
};
// login and create a session in the server
exports.login = (req, res) => {
  let userName = req.body.userName,
    password = req.body.password;
  console.log(userName, password);

  User.findOne({ userName: userName })
    .then(user => {
      user.comparePassword(password, (error, match) => {
        if (!match) {
          return res.status(400).send({
            message: `Invalid password`
          });
        }
      });
      console.log(user);
      res.send({
        message: 'The username and password combination is correct!'
      });
      req.session.autenticated = true;
      req.session.userData = { userName: userName, userEmail: user.email };
      console.log(req.session);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({
        message: `An error occured while trying to login`
      });
    });
};
// logout destroy the session
exports.logout = (req, res) => {
  req.session.destroy(err => {
    res.send('User logged out');
  });
};
