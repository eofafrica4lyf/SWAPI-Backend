const axios = require("../axios");
const ErrorHandler = require("../utils/ErrorHandler");
const publicIp = require("public-ip");
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
            movies.data.results = await Promise.all(movies.data.results.sort((a, b) => 
                (new Date(a.release_date) - new Date(b.release_date)))
                .map( async ({title, episode_id, opening_crawl}) => {
                    let comment_count = await models.comment.count({
                        where: {
                            movieId: episode_id
                        }
                    })
                    return {
                        title,
                        comment_count, 
                        episode_id, 
                        opening_crawl
                    }
                }))
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
            publicIp: ip,
            utc: new Date().toUTCString()
        })
    }

    /**
     * @desc Get all comments on a movie
     * @param {*} data
     */
    static async getSingleMovieComments ({ movieId }) {
        return await models.comment.findAll({
            where: {
                movieId
            },
            attributes: ["comment", "publicIp", "utc"],
            order: [["createdAt", "DESC"]]
        })
    }
}

module.exports = Movie;