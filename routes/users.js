var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function(req, res, next){
  res.render('profile');
});

router.get('/logout',isLoggedIn, (req, res, next) => {
    req.logut();
    res.redirect("/");
});

router.use('/',notLoggedIn, function(req, res, next){
  next();
})

router.get('/signup', (req, res, next) => {
  var messages = req.flash('error');
  console.log(messages);
  res.render('signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
})

// router.post('/signup', (req, res, next) => {
//   res.redirect('/shop');
// })
router.post('/signup',passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  var messages = req.flash('error');
  console.log(messages);
  res.render('signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
})

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
