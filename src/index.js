import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import timezoneRoutes from './routes/timezone.js';
import workerRoutes from './routes/workers.js';
import shiftRoutes from './routes/shifts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  // origin: 'http://localhost:5173', // Allow Vite frontend on local
  credentials: true
}))

app.use(express.json());

app.use('/api/timezone', timezoneRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/shifts', shiftRoutes);

app.get('/', (req, res) => res.send('Shift Scheduler API running.'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;