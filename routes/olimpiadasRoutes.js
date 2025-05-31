import express from 'express';
import { 
  getOlimpiadas, 
  createOlimpiada, 
  updateOlimpiada, 
  deleteOlimpiada 
} from '../controllers/olimpiadasController.js';

const router = express.Router();

router.get('/', getOlimpiadas);
router.post('/', createOlimpiada);
router.put('/:id', updateOlimpiada);
router.delete('/:id', deleteOlimpiada);

export default router;
