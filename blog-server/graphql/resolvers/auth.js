const bcrypt = require("bcryptjs");
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
  }
};
