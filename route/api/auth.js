require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    if (email.trim() && password) {
      const user = await User.findOne({
        email: email.trim(),
      }).catch((err) => console.log(err));
      if (user != null) {
        const result = await bcrypt.compare(password, user.password);
        if (result === true) {
          // const token = jwt.sign(
          //   { user_id: user._id, email },
          //   process.env.TOKEN_KEY,
          //   {
          //     expiresIn: "2h",
          //   }
          // );
          // user.token = token;
          req.session.user = user;
          req.session.encryptParams = req.encryptParams;
          res.status(200).send("Success");
        } else {
          res.status(201).send("Password Did Not Match");
        }
      } else {
        res.status(201).send("Email Id Not Found");
      }
    } else {
      res.status(201).send("Incomplete Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
