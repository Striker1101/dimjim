const router = require('express').Router();
const { subscribe } = require('../controllers/newsletter.controller');

router.post('/newsletter', subscribe);
module.exports = router;
