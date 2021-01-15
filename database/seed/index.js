require("dotenv").config()
const models = require("../../models");
(async () => {
    await models.comment.create({
        movieId: 1,
        comment: "Some random comment",
        publicIp: "46.5.21.123"
    })
})()