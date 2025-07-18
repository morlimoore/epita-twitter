const express = require('express');
const { Op } = require('sequelize');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    // For now, only allow updating basic info - can extend later
    const updates = {};
    
    // You can add more fields here later if needed
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.update(updates);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all users (for search/suggestions)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.user.userId
        }
      },
      attributes: ['id', 'username', 'email'],
      limit: 20
    });

    res.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
