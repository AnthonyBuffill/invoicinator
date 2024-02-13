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
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;


// This file defines routes for the homepage and login page of an invoice application. It includes the following functionality:

// 1. GET /: Renders the homepage after ensuring authentication with the 'withAuth' middleware. It fetches invoices from the database for the logged-in user and passes them to the homepage template along with the user's logged-in status.

// 2. GET /login: Renders the login page. If a session exists (i.e., the user is already logged in), it redirects the request to the homepage.

// The 'withAuth' middleware ensures that only authenticated users can access the homepage. If any errors occur during the process, a 500 Internal Server Error response is sent.
