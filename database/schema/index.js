const models = require("../../models");

exports.addFakeCommentsToMovies = async () => {
    return await models.comment.bulkCreate(
        [
            {
                movieId: 1,
                comment: "Some random comment",
                publicIp: "456.5.21.123",
                utc: "Wed, 13 Jan 2021 11:28:02 GMT"
            },
            {
                movieId: 1,
                comment: "Another random comment",
                publicIp: "32.5.21.267",
                utc: "Sun, 17 Jan 2021 11:28:02 GMT"
            },
            {
                movieId: 3,
                comment: "Some other random comment",
                publicIp: "80.5.84.13",
                utc: "Fri, 15 Jan 2021 11:28:02 GMT"
            },
        ]
    )
}