const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

// get all specified user data
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll({
            // explicitly select only the fields in attributes - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            attributes: ["email", "userType"],
        });
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// create a new user
router.post("/", async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const userToken = await newUser.generateToken();
        res.send(userToken);
    } catch (error) {
        next(error);
    }
});

// create login token
router.post("/", async (req, res, next) => {
    try {
        const token = await User.authenticate(req.body);
        res.send(token);
    } catch (error) {
        next(error);
    }
});

//get email
router.get("/email", async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.token);
        res.send(user.email);
    } catch (error) {
        next(error);
    }
});
