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
        const providers = await providerSchema.aggregate([
            {
                $lookup: {
                    from: 'totalproviderratings',
                    localField: '_id',
                    foreignField: 'providerId',
                    as: 'rating',
                }
            },
            { $unwind: { path: '$rating', "preserveNullAndEmptyArrays": true } },

        ]);
        return mapper(providers, providerProfile.providerList);
    },


    getProviderById: async function (providerId) {
        console.log('providerId', providerId);
        const result = await providerSchema.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'providerId',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: 'totalproviderratings',
                    localField: '_id',
                    foreignField: 'providerId',
                    as: 'rating',
                }
            },
            { $unwind: { path: '$rating', "preserveNullAndEmptyArrays": true } },
            { $unwind: { path: '$comments', "preserveNullAndEmptyArrays": true } },
            { $match: { _id: new mongoose.Types.ObjectId(providerId) } },
        ]);
        console.log('result', result);
        const final = mapper(result, providerProfile.providerByIdMap);
        console.log('final', final);
        return final;
    },

    searchProviders: async (searchParam, start, limit) => {
        console.log('searchParam', searchParam);
        const providers = providerSchema.find(
            {
                $or: [
                    { 'type': { '$regex': searchParam, '$options': 'i' } },
                    { 'name': { '$regex': searchParam, '$options': 'i' } }
                ]
            }
        );

        const pagedProviders = await util.paginate(providers, start, limit);
        return mapper(pagedProviders, providerProfile.providerList);
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

            matchPipeLine,

        ]);

    const res = await util.paginate(providers, start, limit);
    return res;
};

module.exports = providerService;
