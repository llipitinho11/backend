const express = require('express');
const router = express.Router();
const controller = require('../controllers/medalhasController');

router.get('/', controller.getMedalhas);
router.post('/', controller.createMedalha);
router.delete('/:id', controller.deleteMedalha);

module.exports = router;
