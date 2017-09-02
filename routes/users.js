var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require('../models/user');

mongoose.connect("mongodb://192.168.0.107/mydb");

router.route("/")
  .get(function(req, res, next) {
    User.find(function(err, users) {
      console.log(users);
      res.render('users', { title: 'Users', users: users });
    });
  });

router.route("/:name")
  .get(function(req, res, next) {
    User.find({name: req.params.name}, function(err, users) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(users);
      res.json(users);
    });
  });

router.route("/:name/:age/:email")
  .post(function(req, res, next) {
    const params = req.params;

    var user = new User();
    user.name = params.name;
    user.age = params.age;
    user.email = params.email;

    user.save(function(err, user) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(`Create user: ${params.name}, ${params.age}, ${params.email}`);
      res.json(user);
    });
  })
  .put(function(req, res, next) {
    User.update({ name: req.params.name }, { age: req.params.age, email: req.params.email }, function(err, user) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(`User ${req.params.name} updated successfully`);
      res.json(user);
    });
  })
  .delete(function(req, res, next) {
    const query = {
      name: req.params.name,
      age: req.params.age,
      email: req.params.email
    };
    User.remove(query, function(err, user) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(`User ${req.params.name} deleted`);
      res.json(user);
    });
  });

module.exports = router;
