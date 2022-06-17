const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// create a new user
router.post('/', async (req, res, next) => {
  try {
    console.log('CONSOLE LOG', req.body);
    const newUser = await User.create(req.body);
    const userToken = await User.generateToken();
    res.send(userToken);
  } catch (error) {
    next(error);
  }
});

// create login token
router.post('/', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send(token);
  } catch (error) {
    next(error);
  }
});

//log in

// router.get('/:userid/cart/:cartid/:productid');
