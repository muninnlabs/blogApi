const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    _id: Schema.ObjectId,
    postTitle: String,
    postImage: String,
    postContent: String,
    postDate: Date,
    postUser: [
      {
        userId: String,
        userName: String
      }
    ],

    postComments: [
      {
        userName: String,
        userAvatar: String,
        commentContent: String,
        commentDate: String
      }
    ],
    likes: [
      {
        userName: String,
        userDisplayName: String,
        userId: String
      }
    ]
  },
  {
    timestamp: true,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('publication', PostSchema);
