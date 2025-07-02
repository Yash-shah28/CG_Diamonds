import mongoose,{ model, Schema } from "mongoose";

const cartItemSchema = new Schema({
    diamond: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diamond',
        required: true
    },
    quantity: {
        type: Number,
        default:1,
        min:1
    }
});

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
}, {timestamps: true});

export const Cart = model('Cart', cartSchema);
