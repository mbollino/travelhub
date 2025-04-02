const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    number: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["office", "mobile"],
      required: true,
    },
  },
  phonePreferred: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
  },
  emailPreferred: {
    type: Boolean,
  },
  departDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
  },
  airline: {
    type: String,
  },
  carRentalRequired: {
    type: String,
    enum: ["yes", "no", "maybe"],
    required: true,
  },
  status: {
    type: String,
    enum: ["tentative", "paymentPending", "booked"],
    required: true,
  },
  notes: {
    type: String,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    number: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["office", "mobile"],
      required: true,
    },
  },
  currentClients: [clientSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
