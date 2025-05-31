import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

import authRoutes from './routes/authRoutes.js';
import olimpiadasRoutes from './routes/olimpiadasRoutes.js';
import medalhasRoutes from './routes/medalhasRoutes.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/olimpiadas', olimpiadasRoutes);
app.use('/api/medalhas', medalhasRoutes);

// Teste de rota GET
app.get('/olimpiadas', async (req, res) => {
  const { data, error } = await supabase.from('olimpiadas').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Start do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
