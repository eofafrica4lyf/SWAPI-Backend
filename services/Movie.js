const axios = require("../axios");
const ErrorHandler = require("../utils/ErrorHandler");
const publicIp = require("public-ip");
const models = require("../models");
const {
    metricToImperial
} = require("../utils/helpers")

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
            movies.data.results = await Promise.all(
                movies.data.results.sort((a, b) => (new Date(a.release_date) - new Date(b.release_date)))
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

    /**
     * @desc Get all characters on a movie
     * @param {*} data
     */
    static async getSingleMovieCharacters ({ movieId, sort, order, gender }) {
        try {
            const movie = await axios.get(`/api/films/${movieId}`);
            const characterUrls = movie.data.characters;
            const promisesArray = []
            for(let index = 0; index < characterUrls.length; index++){
                promisesArray.push(axios.get(characterUrls[index]))
            }
            let characters = await Promise.all(promisesArray)
            characters = characters.map((character) => character.data)
                .sort((a,b) => {
                    if(sort === "name"){
                        if(a["name"] > b["name"]) return order === "ASC" ? 1 : -1;
                        if(a["name"] < b["name"]) return order === "ASC" ? -1 : 1;
                        return 0
                    }else{   
                        if(Number(a["height"]) > Number(b["height"])) return order === "ASC" ? 1 : -1;
                        if(Number(a["height"]) < Number(b["height"])) return order === "ASC" ? -1 : 1;
                        return 0
                    }
                })
                .filter(character => (gender === "all" || character.gender === gender ));

            let totalHeight = characters.reduce((a,b) => {
                return (Number(a) + Number(b.height))
            }, 0)

            return{
                characters,
                count: characters.length,
                totalHeight: {
                    metric: totalHeight + " cm",
                    imperial: metricToImperial(totalHeight)
                }
            }
        } catch (error) {
            console.log(error)
            throw new ErrorHandler("Some error occured", 500)
        }
    }
}

module.exports = Movie;