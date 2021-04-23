const httpStatusCodes = require('http-status-codes');

const util = {
    paginate: async (query, start, limit) => {
        const result = await query.skip(parseInt(start)).limit(parseInt(limit));

        return result;
    },
    logAndReturnError: (e, res) => _logAndReturnError(e, res),

    processAndReturn: async (action, res) => {
        console.log('action', action);
        try {
            const result = await action;
            return res.status(httpStatusCodes.OK).json(result);
        }
        catch (e) {
            _logAndReturnError(e, res);
        }
    },
    process: async (action, res) => {
        try {
            await action();
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            _logAndReturnError(e, res);
        }
    }


};

_logAndReturnError = function (e, res) {
    console.log(e);
    return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: e.message,
    });
};

module.exports = util;