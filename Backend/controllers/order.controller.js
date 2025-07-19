import Order from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ user: userId }).populate("items.diamond");

        if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

        const totalAmount = cart.items.reduce((sum, item) => sum + item.diamond.cashPrice * item.quantity, 0);

        const newOrder = new Order({
            user: userId,
            items: cart.items.map((item) => ({
                diamond: item.diamond._id,
                quantity: item.quantity
            })),
            totalAmount
        });

        await newOrder.save();
        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).populate("items.diamond").sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
