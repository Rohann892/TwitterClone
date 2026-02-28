import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/connect.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'

dotenv.config()

const app = express();
databaseConnection();

const PORT = process.env.PORT || 8080;


// middlewares
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cookieParser());


// routes
app.get('/', (req, res) => {
    res.send('Hello Rohan 🚀 Server is working!');
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);

app.listen(PORT, () => console.log('server connnected at port:', PORT)); 