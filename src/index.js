import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import timezoneRoutes from './routes/timezone.js';
import workerRoutes from './routes/workers.js';
import shiftRoutes from './routes/shifts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('combined'));

app.use(cors({
  origin: ['https://fc-itw-bacon.web.app', 'https://fc-itw-bacon.firebaseapp.com'],
  credentials: true
}));

app.use(express.json());

app.use('/api/timezone', timezoneRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/shifts', shiftRoutes);

app.get('/', (req, res) => res.send('Shift Scheduler API running.'));

app.get('/healthz', (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;