const router = require("express").Router();
const MovieController = require("../controllers/MovieController.js");

router.get("/", MovieController.getAll)

module.exports = router;