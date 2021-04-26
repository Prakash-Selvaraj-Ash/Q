const express = require("express");
const authorize = require("../../middlewares/auth/auth.middleware");
const providerController = require('./provider.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', providerController.getProviders);
router.get('/byId/:id', providerController.getProviderById);
router.get('/all', providerController.getAllProviders);
router.get('/search', providerController.searchProviders);
router.post("/_fake", authorize, providerController.createFakeProvider);
router.post('/', authorize, providerController.searchProviders);


module.exports = router;