const router = require("express").Router();
const MovieController = require("../controllers/MovieController.js");

router.get("/", MovieController.getAll)
router.get("/:movieId/comments", MovieController.getSingleMovieComments)

router.post("/comment/add", MovieController.addComment)

module.exports = router;