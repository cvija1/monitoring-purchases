const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../config/nodemailer.config");
const User = require("../models/userModel");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, username, email, password } = req.body;
  if (!name || !surname || !username || !password || !email) {
    res.status(400);
    throw new Error("Унесите сва поља");
  }

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  if (usernameExists) {
    res.status(400);
    throw new Error("Корисник већ постоји са тим корисничким именом");
  }
  if (emailExists) {
    res.status(400);
    throw new Error("Корисник већ постоји са тим имејлом");
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    confirmationCode: token,
    surname,
    username,
    password: hashedPassword,
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      message:
        "Корисник је регистрован успјешно! Молим Вас провјерите Ваш имејл!",
    });

    console.log(user.confirmationCode);
    sendConfirmationEmail(user.username, user.email, user.confirmationCode);
  } else {
    res.status(400);
    throw new Error("Кориснички подаци нису валидни!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401);
    throw new Error(
      "Нешто сте погријешили или налог са овим корисничким именом и шифром не постоји"
    );
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Погрешна лозинка!");
  }

  if (user.status != "Active") {
    res.status(401);
    throw new Error("Налог је на чекању. Верификујте своју имејл адресу!");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Нешто сте погријешили");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен!");
  }

  user.status = "Active";
  try {
    await user.save();
    res.status(200).json({
      message: "Успјешна верификација!",
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    username: req.user.username,
    name: req.user.name,
  };

  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
};
