const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  dp:{
    type:String
  },
  fullname: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});
userSchema.plugin(plm);
// Create the User model
module.exports = mongoose.model('User', userSchema);

// module.exports = User;
