import express from "express"
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/schoolRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);

db.query('SELECT * FROM school')
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Database Connection Error : ", err.message);
    });

app.get('/', (req, res) => {
    res.send({ status: "success", message: "Server is healthy!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});