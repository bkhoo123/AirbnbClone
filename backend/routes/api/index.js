// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const reviewImageRouter = require('./review-images.js')
const bookingsRouter = require('./bookings.js')
const spotImageRouter = require('./spot-images.js')
const { restoreUser } = require("../../utils/auth.js");
const favoritesRouter = require('./favorites.js')

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null


// Add a XSRF-TOKEN cookie
router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    message: "Successfully got token",
    'XSRF-Token': csrfToken
  });
});

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter)

router.use('/review-images', reviewImageRouter)

router.use('/bookings', bookingsRouter)

router.use('/spot-images', spotImageRouter)

router.use('/favorites', favoritesRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;