const models = require("../../models");

exports.addFakeCommentsToMovies = async () => {
    return await models.comment.bulkCreate(
        [
            {
                movieId: 1,
                comment: "Some random comment",
                publicIp: "456.5.21.123"
            },
            {
                movieId: 1,
                comment: "Another random comment",
                publicIp: "32.5.21.267"
            },
            {
                movieId: 3,
                comment: "Some other random comment",
                publicIp: "80.5.84.13"
            },
        ]
    )
}