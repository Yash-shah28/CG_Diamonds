import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
    const { diamondId, quantity } = req.body;
    const userId = req.userId;
    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] })
        }
        const existingItems = cart.items.find(item => item.diamond.toString() === diamondId)

        if (existingItems) {
            existingItems.quantity += quantity;
        } else {
            cart.items.push({ diamond: diamondId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Diamonds added to cart', cart });

    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const removeFromCart = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { diamond: id } } },
            { new: true }
        );
        res.status(200).json({ message: 'Removed from cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }

}

export const updateQuantity = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });


        const item = cart.items.find(item => item.diamond.toString() === id);
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });


        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Quantity updated', cart });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });

    }
}

export const getCart = async (req, res) => {
    const userId = req.userId;
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.diamond');
        if (!cart) return res.status(200).json({ items: [] });

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });


    }
}