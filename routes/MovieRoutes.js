const router = require("express").Router();
const models = require("../models");

router.get("/", async (req, res, next) => {
    const v = await models.comment.findAll({
        where: {}
    })

    res.json(v);
})

module.exports = router;