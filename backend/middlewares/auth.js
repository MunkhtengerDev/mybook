const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.requireLogin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Token is missing or invalid.',
    });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: 'Authentication failed. Token is invalid.',
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'You are not allowed to access this page',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in admin middleware',
      error,
    });
  }
};

exports.isWorker = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: 'You are not allowed to access this page',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in worker middleware',
      error,
    });
  }
};
