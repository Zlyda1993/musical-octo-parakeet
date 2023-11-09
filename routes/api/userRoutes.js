const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  } = require('../../controllers/userController.js');

    // route: /api/users/
router.route('/').get(getUsers).post(createUser);

    // route: /api/users/:userId
router
    .route('/:usersId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

    // route: /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);
    // route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;