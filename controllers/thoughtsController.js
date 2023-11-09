const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
            };
            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ id: req.params.thoughtId });
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought by that ID' });
            }
    
            res.json({
                thought,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.usersId },
                { $addToSet: { thoughts: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ id: req.params.thoughtId });
    
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }
    
            res.json({ message: 'Thought has been successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
    
            if (!thought) {
                res.status(404).json({ message: 'No thought by this id!' });
            }
    
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        console.log('You are adding a new reaction');
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { id: req.params.thoughtsId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { id: req.params.thoughtsId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            res.json({ message: 'Reaction has been successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};