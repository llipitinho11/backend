import express from 'express';
const router = express.Router();
const controller = require('../controllers/olimpiadasController');

router.get('/', controller.getOlimpiadas);
router.post('/', controller.createOlimpiada);
router.put('/:id', controller.updateOlimpiada);
router.delete('/:id', controller.deleteOlimpiada);

export default router;
