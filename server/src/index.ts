import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import predictRoute from './routes/predict';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/predict', predictRoute);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
