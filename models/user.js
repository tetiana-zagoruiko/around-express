const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: /(^https?:\/\/)(w{3}\.)?\w[\w-]{1,}\.\w[\w\/]{1,}\/?/gi
  }
});


module.exports = mongoose.model('user', userSchema);