const Joi = require("@hapi/joi");
const isEmpty = require("./is-empty");

exports.postCommentValidation = (data) => {
    data.movieId = !isEmpty(data.movieId) ? parseInt(data.movieId, 10) : "";
    data.comment = !isEmpty(data.comment) ? data.comment : "";

    const postCommentSchema = Joi.object({
        movieId: Joi.number().greater(0).required().messages({
            "number.base": "ID must be a number",
            "number.greater": "ID must be greater than zero",
            "any.required": "ID is required"
        }),
        comment: Joi.string().trim().max(500).required().messages({
            "string.base": "comment must be a string",
            "any.required": "comment is required",
            "string.max": "A comment should have a maximum of 500 characters"
        })
    })

    return postCommentSchema.validateAsync(data, {
        abortEarly: false
    });
}

exports.movieIdValidation = async (data) => {
    data.movieId = !isNaN(data.movieId) ? parseInt(data.movieId) : "";
    const movieIdSchema = Joi.object({
        movieId: Joi.number().min(1).required().messages({
            "number.base": "Movie id must be a number",
            "number.min": "Invalid movie id",
            "any.required": "Movie id is required"
        })
    });
    return await movieIdSchema.validateAsync(data, {
        abortEarly: false
    });
};

exports.getMovieCharactersValidation = async (data) => {
    data.movieId = !isNaN(data.movieId) ? parseInt(data.movieId) : "";
    data.sort = !isEmpty(data.sort) ? data.sort : "";
    data.order = !isEmpty(data.order) ? data.order : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";

    const getMovieCharactersSchema = Joi.object({
        movieId: Joi.number().min(1).required().messages({
            "number.base": "Movie id must be a number",
            "number.min": "Invalid movie id",
            "any.required": "Movie id is required"
        }),
        sort: Joi.string().trim().valid("name", "height").required().messages({
            "string.base": "Sort type field must be string",
            "string.empty": "Sort type field is required",
            "any.required": "Sort type field is required",
            "any.only": "Sort type field must either be name or height"
        }),
        order: Joi.string().trim().valid("ASC", "DESC").required().messages({
            "string.base": "Order type field must be string",
            "string.empty": "Order type field is required",
            "any.required": "Order type field is required",
            "any.only": "Order type field must either be ASC or DESC"
        }),
        gender: Joi.string().trim().valid("all", "male", "female", "hermaphrodite", "n/a").required().messages({
            "string.base": "Gender type field must be string",
            "string.empty": "Gender type field is required",
            "any.required": "Gender type field is required",
            "any.only": "Gender type field must either be all or male or female or hermaphrodite or n/a"
        })
    });
    return await getMovieCharactersSchema.validateAsync(data, {
        abortEarly: false
    });
};