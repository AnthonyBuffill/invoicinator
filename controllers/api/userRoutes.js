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
              email: req.body.email
          }
      }).then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({ message: 'No user with that email or password!' });
              return;
          }
          const validPassword = dbUserData.checkPassword(req.body.password);

          if (!validPassword) {
              res.status(400).json({ message: 'No user with that email or password!' });
              return;
          }
          req.session.save(() => {

              req.session.user_id = dbUserData.id;
              req.session.user_email = req.body.email;
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
      req.session.loggedIn = true;
      req.session.user_email = req.body.email;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end('something went wrong');
  }
});

module.exports = router;
