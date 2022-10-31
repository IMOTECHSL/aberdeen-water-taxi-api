const userService = require("../services/users.service");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { verificationEmail } = require("../utils/mailer.utils");

const { validationResult } = require("express-validator");

exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req).array();

    if (errors.length) {
      return res.status(400).json({ status: "BAD REQUEST", data: errors });
    }

    let { fullname, username, email, phoneNumber, password } = req.body;

    // check if username, email or phone number exist
    const usernameTaken = await userService.getUserByUsername(username);
    const phoneTaken = await userService.getUserByPhone(phoneNumber);
    const emailTaken = await userService.getUserByEmail(email);
    if (usernameTaken) {
      return res
        .status(400)
        .json({ status: "BAD REQUEST", data: "Username Already Exist" });
    }
    if (emailTaken) {
      return res
        .status(400)
        .json({ status: "BAD REQUEST", data: "Email Already Exist" });
    }
    if (phoneTaken) {
      return res
        .status(400)
        .json({ status: "BAD REQUEST", data: "Phone Number Already Exist" });
    }

    // hash user's password
    const hashSalt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(password, hashSalt);

    //generate verification token
    const token = await crypto.randomInt(100000, 999999);
    let user = {
      fullname,
      username,
      email,
      phoneNumber,
      hashedPassword,
      token,
      userType: "customer",
    };
    // save to database
    userService.createUser(user).then(async (doc) => {
      console.log(doc);
      if (user) {
        //send verification email to the user
        await verificationEmail(doc);
        //send response to the user
        res.sendStatus(201);
      } else {
        res.sendStatus(500);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    //get token from url
    let { token } = req.query;
    console.log(token);
    if (
      !Number.isSafeInteger(parseInt(token)) ||
      token.length < 6 ||
      token.length > 6
    ) {
      return res.sendStatus(400);
    }

    token = parseInt(token);
    const tokenValid = await userService.getUserByToken(token);

    console.log(tokenValid);
    if (tokenValid) {
      const done = await userService.verifyAccount(tokenValid._id);
      res
        .status(200)
        .json({ status: "success", data: "Account veirifed Successfully" });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
};

exports.authenticate = async (req, res, next) => {
  res.sendStatus(200);
};

exports.recoverUserPassword = (req, res, next) => {
  //todo verify users account
};

exports.LoginHandler = async (req, res, next) => {
  try {
    let errors = validationResult(req).array();

    if (errors.length) {
      errors = errors.map((error) => {
        return {
          msg: error.msg,
        };
      });

      return res.status(400).json({
        status: "error",
        data: {
          error: errors,
        },
      });
    }

    //get username and password from user
    const { username, password } = req.body;

    //todo validate data

    //check if username or email exist in database
    const usernameExist = await userService.getUserByUsername(username);
    const emailExist = await userService.getUserByEmail(username);
    const user = usernameExist || emailExist;

    //check if user exist, else return a 400 error
    if (!user) {
      return res.status(400).json({
        status: "error",
        data: {
          msg: "Account Does Not Exist",
        },
      });
    }

    //check if password is correct for the given user
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        data: "Username or password is incorrect",
      });
    }

    // check if the account has been verified
    if (user.verifiedAt === null) {
      return res.status(400).json({
        status: "error",
        data: "Account Not Verified",
      });
    }

    //generate access and refresh token
    const accessToken = jwt.sign(
      {
        sub: user._id,
        // fullname: user.fullname,
        // username: user.username,
        admin: user.userType === "admin" ? true : false,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
        //todo add token audience and issuer
      }
    );

    //send response to user
    return res.status(200).json({ status: "success", data: accessToken });
  } catch (error) {
    next(error);
  }
};
