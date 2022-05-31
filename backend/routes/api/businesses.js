const express = require('express');
const asyncHandler = require('express-async-handler');

const {requireAuth} = require('../../utils/auth.js');

const {User, Business, Review} = require('../../db/models');

const router = express.Router();

router.get('/all', requireAuth, asyncHandler(async (req, res) => {
    const businesses = await Business.findAll({
        include: [User, Review]
    });
    res.json(businesses);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const business = await Business.findOne({
      where: {
        id: req.params.id
      },
      include: [User, Review]
    });
    return res.json(business);
  }))

router.post("/new", requireAuth, asyncHandler(async (req, res) => {
  const { name, imgUrl, owner_id, body, location, rating, likes } = req.body;
  const business = await Business.create({
    name,
    imgUrl,
    owner_id,
    body,
    location,
    rating,
    likes
  });

  await business.save();
  return res.json({business});
}));

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { name, imgUrl, owner_id, body, location, rating, likes } = req.body;
    const business = await Business.findOne({
      where: {
        id: req.params.id
      },
      include: User
    });
    business.name = name;
    business.imgUrl = imgUrl;
    business.owner_id = owner_id;
    business.body = body;
    business.location = location;
    business.rating = rating;
    business.likes = likes;
    await business.save();
    return res.json({ business });
  }))

  router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const business = await Business.findOne({where: {id: req.params.id}});
    await business.destroy();
    return res.json({ business });
  }))

module.exports = router;
