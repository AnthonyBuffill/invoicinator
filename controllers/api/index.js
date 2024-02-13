
const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const blogRoutes = require('./postRoutes');

router.use('/users', userRoutes);
// router.use('/blogposts', blogRoutes);

module.exports = router;