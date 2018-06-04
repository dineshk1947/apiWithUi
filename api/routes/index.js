
var express = require('express'),
    router = express.Router();

router.use('/login/auth', require('./loginRouter'));

router.use('/leads', require('./leadRouter'));
router.use('/lead', require('./leadNormalRouter'));
router.use('/lead-bsms', require('./leadBsmRouter'));
router.use('/services', require('./serviceRouter'));
router.use('/emp-details', require('./empDetailRouter'));
router.use('/emp-types', require('./empTypeRouter'));
router.use('/register-mail', require('./registerMailRouter'));
router.use('/process', require('./processRouter'));


module.exports = router;