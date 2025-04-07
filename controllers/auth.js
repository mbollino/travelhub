const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    await User.create(req.body);

    res.redirect("/auth/sign-in");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      userFirstName: userInDatabase.userFirstName,
      userLastName: userInDatabase.userLastName,
      userEmail: userInDatabase.userEmail,
      userPhoneNumber: userInDatabase.userPhoneNumber,
      userPhoneCategory: userInDatabase.userPhoneCategory,
    };
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get('/:userId/profile', async (req,res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)  
    res.render('auth/show.ejs', {
      currentUser: currentUser,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:userId/profile', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const deletion = await currentUser.deleteOne()
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:userId/profile/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    res.render('auth/edit.ejs', {
      user: user,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:userId/profile', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    user.set(req.body)
    await user.save()
    req.session.user = {
      ...req.session.user,
      username: req.body.username || req.session.username,
      userFirstName: req.body.userFirstName || req.session.userFirstName,
      userLastName: req.body.userLastName || req.session.userLastName,
      userEmail:req.body.userEmail || req.session.userEmail,
      userPhoneNumber: req.body.userPhoneNumber || req.session.userPhoneNumber,
      userPhoneCategory: req.body.userPhoneCategory || req.session.userPhoneCategory,
    };
    res.redirect(`/auth/${user._id}/profile`) 
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;
