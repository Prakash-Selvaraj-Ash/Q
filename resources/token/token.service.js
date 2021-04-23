const mongoose = require('mongoose');
const mapper = require('object-mapper');
const tokenSchema = require('./token.entity');
const tokenProfile = require('./token.profile');
const userTokenSchema = require('./user.token.entity');
const tokenArchiveSchema = require('./token.archive.entity');
const providerSchema = require('../provider/provider.entity');


const tokenService = {
    createToken: async (tokenRequest) => {
        const { providerId, userId } = tokenRequest;

        const provider = await providerSchema.findOne({ _id: new mongoose.Types.ObjectId(providerId) });
        if (!provider) { throw new Error('Invalid provider'); }

        const userToken = await userTokenSchema.aggregate([
            { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
            { $sort: { tokenNumber: -1 } },
            { $limit: 1 }]);

        var tokenNumber = 0;
        if (!userToken || userToken.length == 0) { tokenNumber = 1 }
        else { tokenNumber = userToken[0].tokenNumber + 1; }

        if (provider.maxToken < tokenNumber) { throw new Error('Provider availability is full'); }

        await userTokenSchema.create({
            tokenNumber: tokenNumber,
            userId: userId,
            providerId: providerId,
        });
    },

    closeToken: async (tokenId, provider) => {

        const archivedToken = await tokenArchiveSchema.findOne({ tokenId: new mongoose.Types.ObjectId(tokenId) });
        if (!archivedToken) { return; }

        if (archivedToken.providerId.toString() != provider._id.toString()) { throw new Error('provider mismatch'); }

        let timeServed = Date.now() - (archivedToken.startedOn.getTime());
        let timeServedInMin = timeServed / 1000 / 60

        archivedToken.timeServed = timeServedInMin;
        await archivedToken.save();

        await tokenSchema.findOneAndUpdate(
            { providerId: archivedToken.providerId },
            { $set: { lastWaitingTime: timeServedInMin } });

        await userTokenSchema.deleteOne({ _id: tokenId });
    },

    processToken: async (tokenId, provider) => {

        const userToken = await userTokenSchema.findOne({ _id: new mongoose.Types.ObjectId(tokenId) });

        if (!userToken) { return; }

        if (userToken.providerId.toString() != provider._id.toString()) { throw new Error('provider mismatch'); }

        const token = await tokenSchema.findOne({ providerId: userToken.providerId });

        await tokenArchiveSchema.create({
            tokenNumber: userToken.tokenNumber,
            userId: userToken.userId,
            providerId: userToken.providerId,
            createdOn: userToken.createdOn,
            tokenId: userToken._id
        });

        if (!token) {
            await tokenSchema.create({
                tokenNumber: userToken.tokenNumber,
                providerId: userToken.providerId
            });

            return;
        }

        token.tokenNumber = userToken.tokenNumber;
        await token.save();
    },

    getCurrentToken: async (providerId) => {
        const token = await tokenSchema.findOne({ providerId: providerId });
        return mapper(token, tokenProfile.getCurrent);
    },

    getTokensForProvider: async (provider) => {
        const tokens = await userTokenSchema.find({ providerId: provider._id });
        return mapper(tokens, tokenProfile.getTokensForProvider);
    },

    getAvailability: async (providerId) => {
        const userToken = await userTokenSchema.aggregate([
            { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
            { $sort: { tokenNumber: -1 } },
            { $limit: 1 }]);

        let tokenNumber = 0;
        if (!userToken || userToken.length == 0) { tokenNumber = 1 }

        const provider = await providerSchema.findOne({ _id: providerId });

        return provider.maxToken > tokenNumber;
    }
}

module.exports = tokenService;