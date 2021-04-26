const authorize = require('../../middlewares/auth/auth.middleware');
const reviewsController = require('./review.controller');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', reviewsController.getreviewsForProvider);

router.post('/', authorize, reviewsController.addReview);

module.exports = router;