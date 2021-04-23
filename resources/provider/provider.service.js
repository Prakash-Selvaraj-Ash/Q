const mongoose = require('mongoose');
const mapper = require('object-mapper');
const util = require('../utils/util');
const providerSchema = require('./provider.entity');
const providerProfile = require('./provider.profile');


const providerService = {
    getProviders: async function (req) {
        const { start, limit, type } = req.query;
        if (type) {
            return await getProvidersWithUserInfo({ $match: { type: type } }, start, limit);
        }
        const providers = await getProvidersWithUserInfo({ $match: {} }, start, limit);
        return providers;
    },

    getAllProviders: async function (req) {
        const providers = await providerSchema.find();
        return providers;
    },


    getProviderById: async function (providerId) {
        const result = await providerSchema.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'providerId',
                    as: 'comments',
                },
            },
            { $match: { _id: new mongoose.Types.ObjectId(providerId) } },
        ]);
        return mapper(result, providerProfile.providerByIdMap);
    },

    searchProviders: async (searchParam, start, limit) => {
        const providers = providerSchema.find(
            {
                $or: [
                    { 'type': { '$regex': searchParam, '$options': 'i' } },
                    { 'name': { '$regex': searchParam, '$options': 'i' } }
                ]
            }
        )

        return await util.paginate(providers, start, limit);
    },

    getProviderByIds: async function (providerIds) {
        const providers = await providerSchema.find({ _id: { $in: providerIds } });
        return mapper(providers, providerProfile.providers);
    },

    createprovider: async function (providerRequest) {
        const createdprovider = await providerSchema.create(providerRequest);
        return createdprovider;
    },

};

getProvidersWithUserInfo = async function (matchPipeLine, start, limit) {
    const providers = providerSchema
        .aggregate([
            // {
            //     // $lookup: {
            //     //     from: 'users',
            //     //     localField: 'userId',
            //     //     foreignField: 'uid',
            //     //     as: 'provideredBy',
            //     // },
            // },
            matchPipeLine,
            //{ $unwind: '$provideredBy' },
        ]);

    //const providers = providerSchema.find();
    const res = await util.paginate(providers, start, limit);
    return res;
};

module.exports = providerService;
