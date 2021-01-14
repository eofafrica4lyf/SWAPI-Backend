require("dotenv").config()
const models = require("../../models");
(async () => {
    await models.comment.create({
        comment: "Some random comment"
    })
})()