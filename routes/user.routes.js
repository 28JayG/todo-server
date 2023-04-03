const { protect } = require('../controller/auth.controller');
const { getMe } = require('../controller/user.controller');

const router = require('express').Router();

router.use(protect);

router.get('/me', getMe);

module.exports = router;
