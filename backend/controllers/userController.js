const JWT = require('jsonwebtoken');
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");


//register user
exports.registerController = async (req, res) => {
  console.log("//================================================================//")
  try {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }

    //existing user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

    //save new user
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = await JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "1w" }
    );

    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};




exports.getAllUsersForBooks = async (req, res) => {
  try {
    const users = await userModel.find({});

    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};


// get all users
exports.getAllUsers = async (req, res) => {
  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
};



exports.getUserByIdController = async (req, res) => {
  const id = req.params.id
  userModel.findById({ _id: id })
    .then(post => res.json(post))
    .catch(err => res.json(err))
}



exports.deleteUserController = async (req, res) => {
  const id = req.params.id
  userModel.findOneAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(err => res.json(err))
}



exports.updateUserController = async (req, res) => {
  const id = req.params.id
  console.log('id =========================> ', id)
  userModel.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    password: req.body.password
  }).then(users => res.json(users))
    .catch(err => res.json(err))
}



//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("==================login================================")
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registered",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = await JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: '1w'
      }
    )
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};


