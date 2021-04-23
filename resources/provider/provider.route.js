const express = require("express");
const authorize = require("../../middlewares/auth/auth.middleware");
const providerController = require('./provider.controller');

const router = express.Router();

router.get('/', providerController.getProviders);
router.get('/all', providerController.getAllProviders);
router.get('/search', providerController.searchProviders);
router.post("/_fake", authorize, providerController.createFakeProvider);
router.post('/', authorize, providerController.searchProviders);


module.exports = router;