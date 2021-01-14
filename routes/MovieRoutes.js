const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.send("Hey there");
})

module.exports = router;