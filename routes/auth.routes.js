const { Router } = require('express');
const {
  getGoogleAuth,
  handleGoogleAuthCallback,
} = require('../controller/auth.controller');

const router = Router();

router.route('/google').get(getGoogleAuth);
router.route('/google/callback').get(handleGoogleAuthCallback);

module.exports = router;
