import mongoose,{Schema, model} from 'mongoose';

const wishlistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // 1 wishlist per user
  },
  diamonds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diamond',
    }
  ]
}, {
  timestamps: true
});

export const Wishlist = model('Wishlist', wishlistSchema);
