const express = require("express");
const router = express();
const movieRoutes = require("../routes/MovieRoutes")

router.use("/movies", movieRoutes);

module.exports = router;