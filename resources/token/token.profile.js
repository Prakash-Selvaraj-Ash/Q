const tokenProfile = {
    getCurrent: {
        _id: "id",
        lastWaitingTime: "lastWaitingTime",
        tokenNumber: "tokenNumber",
        providerId: "providerId"
    },

    getTokensForProvider: {
        "[]._id": "[].id",
        "[].userId": "[].userId",
        "[].tokenNumber": "[].tokenNumber"
    }
}



module.exports = tokenProfile;