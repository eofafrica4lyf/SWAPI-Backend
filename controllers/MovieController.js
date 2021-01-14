const catchAsyncError = require("../middleware/catchAsyncError");
const Movie = require("../services/Movie");

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