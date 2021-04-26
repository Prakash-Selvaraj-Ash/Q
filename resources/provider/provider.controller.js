const providerService = require('./provider.service');
const httpStatusCodes = require('http-status-codes');
const faker = require('faker');
const util = require('../utils/util');

const providerController = {
    getAllProviders: async (req, res) => {
        try {
            const providers = await providerService.getAllProviders(req);
            return res.status(httpStatusCodes.OK).json(providers);
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },

    getProviders: async (req, res) => {
        try {
            const providers = await providerService.getProviders(req);
            console.log('response', providers);
            return res.status(httpStatusCodes.OK).json(providers);
        }
        catch (err) {
            return util.logAndReturnError(err, res);
        }
    },

    getProviderById: async (req, res) => {
        return await util.processAndReturn(providerService.getProviderById(req.params.id), res);
    },

    searchProviders: async (req, res) => {
        try {
            const providers = await providerService.searchProviders(req.query.key, req.query.start, req.query.limit);
            return res.status(httpStatusCodes.OK).json(providers);
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },
    createProvider: async (req, res) => {
        try {
            await providerService.createprovider(req.body);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    },

    createFakeProvider: async (req, res) => {
        try {
            const size = req.query.size;
            if (size > 50) {
                throw new Error('Maximum 50 fake can be created');
            }
            console.log('Creating 500 fake template in server');
            for (let i = 0; i < size; i++) {
                {
                    const name = faker.name.firstName();
                    console.log('name is ', name);
                    const provider = {
                        name: name,
                        type: faker.random.arrayElement(['Hospital', 'Restuarant', 'Salon']),
                        location: [faker.address.latitude(), faker.address.longitude()],
                        userId: req.user.uid,
                        imageUrl: 'https://picsum.photos/640/480',
                        availTime: [12, 14]
                    }

                    await providerService.createprovider(provider);
                }
            }

            return res.json({});
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    }
}

module.exports = providerController;