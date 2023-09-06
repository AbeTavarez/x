const mongoose = require("mongoose");
// https://mongoosejs.com/docs/validation.html#built-in-validators

const commentSchema = mongoose.Schema({body: String, author: String});

const tweetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  comments: [commentSchema]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;