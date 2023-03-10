const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');

const {User, Spot, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models')

const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth')

const {Op} = require("sequelize")


//! Delete a Review Image
//? Only the owner of the review is authorized to delete
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let imageId = req.params.imageId
    let currentUser = req.user.id

    let reviewImage = await ReviewImage.findByPk(imageId)

    //* Error checking if review image doesn't exist 
    //! Confirmed working
    if (!reviewImage) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    //* Review Image can only be deleted by owner 
    //! Confirmed working
    let reviewImageJson = reviewImage.toJSON()
    let reviewId = reviewImageJson.reviewId

    let review = await Review.findByPk(reviewId)
    let reviewJson = review.toJSON()
    let userId = reviewJson.userId


    if (currentUser !== userId) {
        res.status(403)
        return res.json({
            message: "You can only delete this review if you are the owner of the review",
            statusCode: 403
        })
    }

    //* If above errors don't hit delete the Review Image
    //! Confirmed working
    if (reviewImage) {
        res.status(200)
        await reviewImage.destroy()
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})



module.exports = router