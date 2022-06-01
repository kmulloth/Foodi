const express = require('express');
const asyncHandler = require('express-async-handler');

const {requireAuth} = require('../../utils/auth.js');

const {User, Business, Review} = require('../../db/models');

const router = express.Router();

async function avg (business_id) {
  let average;
    await Review.findAll({where: {business_id: business_id}}).then(reviews => {
        let sum = 0;
        reviews.forEach(review => {
            sum += review.value;
            });
        average = sum / reviews.length;
    });
    return average;
}

router.get('/all', requireAuth, asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        include: User
    });
    res.json(reviews);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const review = await Review.findOne({
      where: {
        id: req.params.id
      },
      include: [User, Business]
    });
    return res.json(review);
  }))

router.post("/new", requireAuth, asyncHandler(async (req, res) => {

  const { user_id, business_id, value, body} = req.body;
  const review = await Review.create({
    user_id,
    business_id,
    value,
    body
  });
  const business = await Business.findOne({
    where: {
      id: business_id
    },
    include: [User, Review]
  });

  console.log('BEFORE', business);
  business.rating = await avg(business_id);
  console.log('AFTER', business);

  await business.save();
  await review.save();
  return res.json({review});
}));

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { name, imgUrl, owner_id, body, location, rating, likes } = req.body;
    const review = await Review.findOne({
      where: {
        id: req.params.id
      },
      include: User
    });
    review.user_id = user_id;
    review.business_id = business_id;
    review.value = value;
    review.body = body;
    await review.save();
    return res.json({ review });
  }))

  router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const review = await Review.findOne({where: {id: req.params.id}});
    const businessId = review.business_id;
    await Review.destroy( {where: {id: req.params.id}});

    const business = await Business.findOne({
      where: {
        id: review.business_id
      },
      include: [User, Review]
    });
    business.rating = await avg(businessId);

    await business.save();
    return res.json({ review });
  }))

module.exports = router;
