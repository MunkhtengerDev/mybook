const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  author: {
    type: String,
    required: [true, 'author is required'],
  },
  cover: {
    type: String,
    required: [true, 'cover is required'],
  },
  genres: {
    type: String,
    required: [true, 'genre is required'],
  },
  language: {
    type: String,
    required: [true, 'language is required'],
  },
  released: {
    type: String,
    required: [true, 'released date is required'],
  },
  page: {
    type: String,
    required: [true, 'page is required'],
  },
  publisher: {
    type: String,
    required: [true, 'publisher is required'],
  },

  comments: [
    {
      reviewUserId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    },
  ],
  reviews: [
    {
      userId: {
        type: String,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
     
    },
  ],
},
);

module.exports = mongoose.model('Book', bookSchema);
