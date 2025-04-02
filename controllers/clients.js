const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("clients/index.ejs", {
      currentClients: currentUser.currentClients,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("clients/new.ejs");
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
    currentUser.currentClients.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/clients`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:clientId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentClient = currentUser.currentClients.id(req.params.clientId);
    res.render("clients/show.ejs", {
      currentClient: currentClient,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:clientId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.currentClients.id(req.params.clientId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/clients`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:clientId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentClient = currentUser.currentClients.id(req.params.clientId);
    res.render("clients/edit.ejs", {
      currentClient: currentClient,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:clientId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentClient = currentUser.currentClients.id(req.params.clientId);
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
    currentClient.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/clients/${req.params.clientId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
