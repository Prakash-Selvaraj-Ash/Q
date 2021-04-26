const providerProfile = {

    providerList: {
        "[]._id": "[].id",
        "[].availTime": "[].availTime",
        "[].name": "[].name",
        "[].type": "[].type",
        "[].imageUrl": "[].imageUrl",
        "[].rating._id": "[].review.id",
        "[].rating.rating": "[].review.rating",
        "[].rating.noOfRated": "[].review.noOfRated"
        
    },

    providerByIdMap: {
        "_id": "id",
        "commentsCount": "commentsCount",
        "location": "location",
        "maxToken": "maxToken",
        "availTime": "availTime",
        "name": 'name',
        "type": "type",
        "userId": "userId",
        "imageUrl": "imageUrl",
        "comments[].likesCount": "comments[].likesCount",
        "comments[]._id": "comments[].id",
        "comments[].content": "comments[].content",
        "comments[].replies[]._id": "comments[].replies[].id",
        "comments[].replies[].content": "comments[].replies[].content",
        "comments[].replies[].likesCount": "comments[].replies[].likesCount",
        "rating._id": "review.id",
        "rating.rating": "review.rating",
        "rating.noOfRated": "review.noOfRated"
    }
}


module.exports = providerProfile;