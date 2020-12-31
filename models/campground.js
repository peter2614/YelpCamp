const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // object id from review model
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review' 
    }
  ]
});

// when remove campground, remove all reviews for that campground as well
CampgroundSchema.post('findOneAndDelete', async function(doc) {
  if(doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);