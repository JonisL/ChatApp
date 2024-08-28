const Message = require('../models/messageModel');

const sendMessage = async (req, res) => {
    const { conversationId, text } = req.body;

    try {
        const message = await Message.create({
            conversationId,
            sender: req.user._id,
            text,
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendMessage };
