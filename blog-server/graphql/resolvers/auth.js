const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = {
  createUser: async args => {
    try {
      let user = await User.findOne({ email: args.user.email });
      if (user) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(args.user.password, 12);
      user = new User({
        email: args.user.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      console.log("Log: : catch -> err", err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};
