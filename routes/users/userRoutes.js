const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../../lib/passport')

const userController = require('./controllers/userController')
const userValidation = require('./utils/userValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', (req, res, next) => {
//   User.findOne({email: req.body.email}).then((user) => {
//     if (user) return res.send('User Exists');
//     else {
//       const newUser = new User();

//   // const salt = bcrypt.genSaltSync(10);
//   // const hash = bcrypt.hashSync(req.body.password, salt);

//   newUser.profile.name = req.body.name;
//   newUser.email = req.body.email;
//   newUser.password = req.body.password;

//   newUser.save().then((user) => {
//     if(user) {
//       res.status(200).json({message: 'success', user})
//     }
//   }).catch(err=> {
//     return next(err);
//   })
//     } 
//   })
  
// })


router.get('/register', (req, res)=> {
  res.render('auth/register', {errors: req.flash('errors')}) // passed errors to ejs page
})

router.post('/register', userValidation, userController.register)

router.get('/login', (req, res) => {
 return res.render('auth/login', {errors: req.flash('errors')})
})

//login routes
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
}))

//profile routes
router.get('/profile', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('auth/profile');
  } else {
    return res.send('Unauthorized');
  }
})

module.exports = router;
