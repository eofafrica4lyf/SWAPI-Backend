require("dotenv").config()
const { addFakeCommentsToMovies } = require("../schema")

(async () => {
    await addFakeCommentsToMovies()
})()