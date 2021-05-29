const tokenProfile = {
    getCurrent: {
        _id: "id",
        lastWaitingTime: "lastWaitingTime",
        tokenNumber: "tokenNumber",
        avgWaitingTime: "avgWaitingTime",
        providerId: "providerId"
    },

    getTokensForProvider: {
        "[]._id": "[].id",
        "[].userId": "[].userId",
        "[].tokenNumber": "[].tokenNumber"
    },

    getUserTokens: {
        "[]._id": "[].id",
        "[].userId": "[].userId",
        "[].tokenNumber": "[].tokenNumber",
        "[].provider._id": "[].provider.id",
        "[].provider.name": "[].provider.name",
        "[].provider.type": "[].provider.type",
        "[].provider.imageUrl": "[].provider.imageUrl",
        "[].currentToken.tokenNumber": "[].currentToken.tokenNumber",
        "[].currentToken.lastWaitingTime": "[].currentToken.lastWaitingTime"
    }
}



module.exports = tokenProfile;