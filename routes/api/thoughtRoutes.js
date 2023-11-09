const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtsController.js');

    // route: /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

    // route: /api/thoughts/:thoughtId
router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    // route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
    // route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;