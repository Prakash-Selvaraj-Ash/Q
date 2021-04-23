const express = require("express");

const tokenController = require('./token.controller');
const authorize = require('../../middlewares/auth/auth.middleware');
const providerAuth = require('../../middlewares/auth/provider.middleware');

const router = express.Router();

router.get('/', authorize, providerAuth, tokenController.getTokensForProvider);
router.patch('/close', authorize, providerAuth, tokenController.closeToken);
router.patch('/next', authorize, providerAuth, tokenController.processToken);
router.post("/bookNow", authorize, tokenController.createToken);
router.get('/current', tokenController.getCurrentToken);
router.get('/availability', tokenController.getAvailability);

module.exports = router;