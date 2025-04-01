const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("clients/index.ejs", {
      clients: currentUser.clients,
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
    // const departDateArray = req.body.departDate.split("-")
    // req.body.departDate = new Date(Date.UTC(parseInt(departDateArray[0]), parseInt(departDateArray[1]) - 1, parseInt(departDateArray[2])))
    // const returnDateArray = req.body.returnDate.split("-")
    // req.body.returnDate = new Date(Date.UTC(parseInt(returnDateArray[0]), parseInt(returnDateArray[1]) - 1, parseInt(returnDateArray[2])))
    currentUser.clients.push(req.body);
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
    const client = currentUser.clients.id(req.params.clientId);
    res.render("clients/show.ejs", {
      client: client,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:clientId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.clients.id(req.params.clientId).deleteOne();
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
    const client = currentUser.clients.id(req.params.clientId);
    res.render("clients/edit.ejs", {
      client: client,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:clientId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const client = currentUser.clients.id(req.params.clientId);
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
    client.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/clients/${req.params.clientId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
