const Conversation = require('../models/conversationModel');

const createConversation = async (req, res) => {
    const { participants } = req.body;

    try {
        const conversation = await Conversation.create({ participants });

        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createConversation };
