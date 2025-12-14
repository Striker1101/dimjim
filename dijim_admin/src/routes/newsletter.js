const router = require('express').Router();
const { subscribe, getAll } = require('../controllers/newsletter.controller');

router.post('/newsletter', subscribe);
router.get('/newsletter', getAll);
module.exports = router;
