const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Epita Twitter Backend API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to PostgreSQL and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
    
    // Sync database (create tables)
    await sequelize.sync({ force: true }); // Recreate table for plain text passwords
    console.log('Database synchronized');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
