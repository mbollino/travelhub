const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("travelers/index.ejs", {
      travelers: currentUser.travelers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("travelers/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (req.body.phonePreferred === "on") {
      req.body.phonePreferred = true;
    } else {
      req.body.phonePreferred = false;
    }
    if (req.body.emailPreferred === "on") {
      req.body.emailPreferred = true;
    } else {
      req.body.emailPreferred = false;
    }
    currentUser.travelers.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/travelers`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:travelerId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const traveler = currentUser.travelers.id(req.params.travelerId);
    res.render("travelers/show.ejs", {
      traveler: traveler,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:travelerId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.travelers.id(req.params.travelerId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/travelers`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:travelerId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const traveler = currentUser.travelers.id(req.params.travelerId);
    res.render("travelers/edit.ejs", {
      traveler: traveler,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:travelerId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const traveler = currentUser.travelers.id(req.params.travelerId);
    if (req.body.phonePreferred === "on") {
      req.body.phonePreferred = true;
    } else {
      req.body.phonePreferred = false;
    }
    if (req.body.emailPreferred === "on") {
      req.body.emailPreferred = true;
    } else {
      req.body.emailPreferred = false;
    }
    traveler.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/travelers/${req.params.travelerId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
