var express = require('express');
var router = express.Router();
var CouponController = require('../controllers/couponController');
var cc = new CouponController();

router.get('/', cc.getAll.bind(cc));

router.get('/:id', cc.getById.bind(cc));

router.post('/', cc.create.bind(cc));

router.put('/:id', cc.update.bind(cc));

router.delete('/:id', cc.remove.bind(cc));

module.exports = router;
