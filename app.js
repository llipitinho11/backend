require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const olimpiadasRoutes = require('./routes/olimpiadasRoutes');
const medalhasRoutes = require('./routes/medalhasRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/olimpiadas', olimpiadasRoutes);
app.use('/api/medalhas', medalhasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
