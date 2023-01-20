import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

//setting up bodyParser to properly send our requests
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

app.use(cors());

//all routes in posts will be set to localhost:5000/posts instead of localhost:5000
app.use('/posts', postRoutes);

//greeting route
app.get('/', (req,res) => {
    res.send('Hello to memories API')
})

//DB connection
//const CONNECTION_URL = 'mongodb+srv://SaradaN:test1234@sei.on8vwme.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery',true);
mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//if connection is successful
.then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
.catch((error) => console.log(error.message));//if connection isn't successful

//to avoid warnings in console
//mongoose.set('useFindAndModify', false);
