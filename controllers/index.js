const router = require('express').Router();

const dashboardRoutes = require ('./dashboardRoutes')
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
