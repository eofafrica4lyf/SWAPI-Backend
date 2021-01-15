const catchAsyncError = require("../middleware/catchAsyncError");
const Movie = require("../services/Movie");
const {
    postCommentValidation
} = require("../validation/MovieValidation");

/**
 * @route GET /v1/movies
 * @desc Get all movies
 * @access Public
 */
exports.getAll = catchAsyncError( async (req, res, next) => {
    const data = await Movie.getAll();

    return res.status(200).json({
        success: true,
        message: "",
        data
    })
})

/**
 * @route POST /v1/movies/comment/add
 * @desc Post a comment on a movie
 * @access Public
 */
exports.addComment = catchAsyncError( async (req, res, next) => {
    const validatedData = await postCommentValidation(req.body);
    const data = await Movie.addComment(validatedData);

    return res.status(200).json({
        success: true,
        message: "",
        data
    })
})