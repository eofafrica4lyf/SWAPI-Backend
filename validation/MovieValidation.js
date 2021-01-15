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
        comment: Joi.string().trim().required().messages({
            "string.base": "comment must be a string",
            "any.required": "comment is required"
        })
    })

    return postCommentSchema.validateAsync(data, {
        abortEarly: false
    });
}