// register the user
// route GET /api/users/register
// access public
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const usermodel = require("../models/userModel");

module.exports.registerUser = asynchandler(async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }

  if (!username) {
    console.log("username not defined");
    return;
  }

  let user = await usermodel.findOne({ email });
  if (user) {
    res.send("user already exist");
    return;
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      let createdUser = usermodel.create({
        username,
        email,
        password: hash,
      });
      res.send(createdUser);
    });
  });
});

module.exports.loginUser = asynchandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }
  let user = await usermodel.findOne({ email });
  if (!user) {
    res.send("something went wrong");
    return;
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      res.status(404);
      throw new Error(err);
    }

    if (result) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
      );
      res.status(200).json({ token });
    }else{
        res.status(401)
        throw new Error("invalid email or password")
    }
  });
});

module.exports.showUser = asynchandler(async (req, res) => {
  let users = await usermodel.find();
  res.send(users);
});

// private access only
module.exports.currentUser = asynchandler(async (req, res) => {
  res.send(req.user);
});
