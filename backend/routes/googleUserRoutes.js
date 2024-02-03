const express = require('express');
const passport = require('passport');
const router = express.Router();
require("../auth")

// Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] })

);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/books ' }),
  (req, res) => {
    // Successful authentication, redirect to home page.
    res.redirect('http://localhost:3000/books');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout error' });
    }
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;
