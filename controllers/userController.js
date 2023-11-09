const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();

            const userObj = {
                users,
            };
            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user by that ID' })
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ id: req.params.userId});

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                });
            }
            
            res.json({ message: 'User has be successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.usersId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if (!user) {
                res.status(404).json({ message: 'No user by this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        console.log('You are adding a new friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.usersId },
                { $addToSet: { friends: req.body } },
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
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json({ message: 'Friend has been successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};