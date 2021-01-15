const axios = require("../axios");
const ErrorHandler = require("../utils/ErrorHandler");
const publicIp = require("public-ip")
const models = require("../models");

class Movie{
    /**
     * @desc Get all movies
     */
    static async getAll () {
        try {
            const movies = await axios.get("/api/films");
            /**even though the list comes sorted in the desire format, 
             * going ahead to run a (somewhat redundant) sort function 
             * caters for any future changes
             * */
            movies.data.results = movies.data.results.sort((a, b) => 
                (new Date(a.release_date) - new Date(b.release_date)))
                .map(({episode_id, opening_crawl, release_date}) => ({episode_id, opening_crawl, release_date}))
            return movies.data;
        } catch (error) {
            throw new ErrorHandler("Some error occured", 500)
        }
    }

    /**
     * @desc Post a comment on a movie
     * @param {*} data
     */
    static async addComment ({ movieId, comment }) {
        const ip = await publicIp.v4();
        return await models.comment.create({
            movieId,
            comment,
            publicIp: ip
        })
    }
}

module.exports = Movie;