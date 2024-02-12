const router = require('express').Router();

<<<<<<< HEAD
const dashboardRoutes = require ('./dashboardRoutes')
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
=======
const apiRoutes = require('./apiRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

>>>>>>> c944fdb23398d07ee43cf732fa54ed412b7e15ad
