const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const UserRoute = require('./routes/userRoutes');

const app = express();

// config dotenv
require("dotenv").config();

// middlewire
app.use(cors())
app.use(express.json());

// routes
app.use('/api/v1/user', UserRoute);

app.get("/",(req,res)=>{
    res.send("Backend Is Live")
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        const PORT = 8080 | process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();