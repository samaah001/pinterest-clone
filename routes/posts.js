const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Create the Post model
module.exports = mongoose.model('Post', postSchema);

// module.exports = Post;
