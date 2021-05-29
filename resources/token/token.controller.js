const util = require('../utils/util');
const tokenService = require('./token.service');
const httpStatusCodes = require('http-status-codes');

const tokenController = {
    createToken: async (req, res) => {
        try {
            await tokenService.createToken(req.body);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    },

    processToken: async (req, res) => {
        try {
            await tokenService.processToken(req.query.tokenId, req.provider);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    },

    closeToken: async (req, res) => {
        try {
            await tokenService.closeToken(req.query.tokenId, req.provider);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    },

    getCurrentToken: async (req, res) => {
        try {
            const currentToken = await tokenService.getCurrentToken(req.query.providerId);
            return res.status(httpStatusCodes.OK).json(currentToken);
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    },

    getTokensForProvider: async (req, res) => {
        try {
            const tokens = await tokenService.getTokensForProvider(req.provider);
            return res.status(httpStatusCodes.OK).json(tokens);
        }
        catch (e) {
            util.logAndReturnError(e, res);
        }
    },

    getTokenWaitingTime: async(req, res) => {
        return await util.processAndReturn(tokenService.getTokenWaitingTime(req.query.providerId), res);
    },

    getAvailability: async (req, res) => {
        return await util.processAndReturn(tokenService.getAvailability(req.query.providerId), res);
    },

    getUserTokens: async(req, res) => {
        return await util.processAndReturn(tokenService.getUserTokens(req.user.uid), res);
    }
}

module.exports = tokenController;