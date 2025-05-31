import express from 'express';
import { 
  getMedalhas, 
  createMedalha, 
  deleteMedalha 
} from '../controllers/medalhasController.js';

const router = express.Router();

router.get('/', getMedalhas);
router.post('/', createMedalha);
router.delete('/:id', deleteMedalha);

export default router;
