const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
          attributes: { exclude: ['[password'] }
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
  User.findOne({
          where: {
              username: req.body.username
          }
      }).then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({ message: 'No user with that username!' });
              return;
          }
          const validPassword = dbUserData.checkPassword(req.body.password);

          if (!validPassword) {
              res.status(400).json({ message: 'Incorrect password!' });
              return;
          }
          req.session.save(() => {

              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json({ user: dbUserData, message: 'You are now logged in!' });
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end('something went wrong');
  }
});

module.exports = router;
