const express = require('express');
const connectDB = require('./config/db');
const swaggerSpec = require('./swagger/swaggerConfig');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const { app, server } = require('./Socket/socket');

require('dotenv').config();
app.use(express.json());
app.use(cors());
// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/auth',require('./routes/authRoute'));
app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/comment', require('./routes/commentRoute'));
app.use('/api/playlist', require('./routes/playlistRoute'));
app.use('/api/video', require('./routes/videoRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/subscriptions', require('./routes/subscriptionRoute'));
app.use('/api/likeComment', require('./routes/likeCommentRoute'));
app.use('/api/like', require('./routes/likeRoute'));
app.use('/api/save', require('./routes/saveRoute'));
app.use('/api/search', require('./routes/searchRoute'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'test, this is your API!' });
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
