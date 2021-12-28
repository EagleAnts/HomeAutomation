require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const router = express.Router();

// Register
router.post("/", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const firstName = req.body.firstName.trim();
    const middleName = req.body.middleName.trim();
    const lastName = req.body.lastName.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    if (req.body.confirmPassword === password && firstName && email) {
      const foundUser = await User.findOne({ email: email }).catch((err) =>
        console.log(err)
      );
      if (foundUser == null) {
        const user = await User.create({
          firstName,
          middleName,
          lastName,
          email,
          password: await bcrypt.hash(password, 10),
        });
        // Create token
        // const token = jwt.sign(
        //   { user_id: user._id, email },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "2h",
        //   }
        // );
        // save user token
        // user.token = token;
        req.session.user = user;
        req.session.encryptParams = req.encryptParams;
        res.status(200).send(`${user.firstName} ${user.lastName}`);
      } else {
        res.status(201).send("User Already Registered");
      }
    } else {
      res.status(201).send("Registeration credentials incorrect");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
