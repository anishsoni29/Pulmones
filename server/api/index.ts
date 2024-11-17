import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import predictRoute from './predict';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/predict', predictRoute); // Updated route path for Vercel

// Health check route for testing
app.get('/api/health', (req, res) => {
  res.status(200).send('Server is running on Vercel!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Export the app for Vercel
