const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

// Connect Database
connectDB();

// Init Middleware (BodyParser now built into express)
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Coin Worth API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/coins', require('./routes/api/coins'));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
