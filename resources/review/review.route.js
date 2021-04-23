const reviewsController = require('./review.controller');
const express = require('express');
const router = express.Router();

router.get('/', reviewsController.getreviewsForProvider);

router.post('/', reviewsController.addReview);

module.exports = router;