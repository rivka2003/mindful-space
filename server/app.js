const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mantraRoutes = require('./routes/mantraRoutes');
const userRoutes = require('./routes/userRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const meditationRoutes = require('./routes/meditationRoutes');
const journalPromptRoutes = require('./routes/journalPromptRoutes');
const habitRoutes = require('./routes/habitRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/mantras', mantraRoutes);
app.use('/api/users', userRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/meditations', meditationRoutes);
app.use('/api/journal-prompts', journalPromptRoutes);
app.use('/api/habits', habitRoutes);

app.get('/', (req, res) => {
    res.send('Mindful Space Server is Running!');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is moving on http://localhost:${PORT}`);
});
