import { Wishlist } from "../models/wishlist.model.js";

export const addwhishlist = async (req, res) => {
    const { diamondId } = req.body;
    const userId = req.userId;
    try {
        let whishlist = await Wishlist.findOne({ user: req.userId });

        if (!whishlist) {
            whishlist = new Wishlist({
                user: userId,
                diamonds: [diamondId]
            });
        } else if (!whishlist.diamonds.includes(diamondId)) {
            whishlist.diamonds.push(diamondId);
        }
        await whishlist.save();
        return res.status(201).json({ message: 'Wishlist created and diamond added' });

    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deletewishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.userId });

        if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

        wishlist.diamonds = wishlist.diamonds.filter(
            (id) => id.toString() !== req.params.id
        );

        await wishlist.save();
        res.json({ success: true, wishlist });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const getwhishlist = async (req, res) => {
    const userId = req.userId;
    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('diamonds');
        res.status(200).json({ wishlist: wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}