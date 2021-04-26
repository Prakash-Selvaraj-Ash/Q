const express = require("express");
const doctorController = require('./doctor.controller');
const authorize = require('../../middlewares/auth/auth.middleware');
const providerAuth = require('../../middlewares/auth/provider.middleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", authorize, providerAuth, doctorController.createDoctor);
router.post("/_fake", authorize, doctorController.createFakeDoctors);
router.get('/', doctorController.getDoctorByHospitalId);
router.get('/search', doctorController.searchDoctors);

module.exports = router;