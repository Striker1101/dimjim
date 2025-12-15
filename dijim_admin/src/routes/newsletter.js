const router = require('express').Router();
const { subscribe, getAll } = require('../controllers/newsletter.controller');

router.post('/', subscribe);
router.get('/', getAll);
module.exports = router;
