const express = require('express');
const router = express.Router();
const { 
  Invoice 
} = require('../models/invoice');
const withAuth = require('../utils/auth');



router.get('/', (req, res) => {
 
  res.render('home'); 

});





router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;


