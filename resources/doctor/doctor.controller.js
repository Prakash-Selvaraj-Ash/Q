const doctorService = require('./doctor.service');
const httpStatusCodes = require('http-status-codes');
const providerService = require('../provider/provider.service');
const faker = require('faker');
const util = require('../utils/util');


const doctorController = {
    searchDoctors: async (req, res) => {
        try {
            const doctors = await doctorService.searchDoctors(req.query.key, req.query.start, req.query.limit);
            return res.status(httpStatusCodes.OK).json(doctors);
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },
    getDoctorByHospitalId: async (req, res) => {
        try {
            const doctors = await doctorService.getDoctors(req.query.hospitalId);
            return res.status(httpStatusCodes.OK).json(doctors);
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },

    createDoctor: async (req, res) => {
        try {
            await doctorService.createDoctor(req.body);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },

    createFakeDoctors: async (req, res) => {
        const providers = await providerService.getProviders({ query: { start: 1, limit: 20, type: 'Hospital' } });
        const providerIds = providers.map(provider => provider._id);
        try {
            const size = req.query.size;
            if (size > 50) {
                throw new Error('Maximum 50 fake can be created');
            }
            console.log('Creating 500 fake doctor in server');
            for (let i = 0; i < size; i++) {
                const doctor =
                {
                    name: faker.name.firstName(),
                    type: 'Doctor',
                    subType: faker.random.arrayElement(['DGO', 'Surgeon', 'Cardiac', 'Ortho', 'Onco']),
                    location: [faker.address.latitude(), faker.address.longitude()],
                    userId: req.user.uid,
                    imageUrl: 'https://picsum.photos/640/480',
                    availTime: [12, 14],
                    providerId: faker.random.arrayElement(providerIds),
                }

                await doctorService.createDoctor(doctor);
            }
            return res.json({});
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    }
}
module.exports = doctorController;

