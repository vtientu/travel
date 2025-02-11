const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cor = require('cors');
const connectDB = require('./db/db.js');
const post = process.env.PORT;
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(cor());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

connectDB();

app.listen(post, () => {
    console.log(`Server is running on port ${post}`);
});