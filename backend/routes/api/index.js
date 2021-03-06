const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessesRouter = require('./businesses.js');
const reviewsRouter = require('./reviews.js');

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/businesses', businessesRouter);
router.use('/reviews', reviewsRouter);

router.post('/test', function(req, res){
    res.json({requestBody: req.body});
});

router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
}));

router.get('/maps-api-key', asyncHandler(async(_req, res) => {
  const key = process.env.GOOGLE_MAPS_API_KEY
  return res.json({key})
}))

router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
