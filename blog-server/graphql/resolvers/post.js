const { Post, User } = require("../../models");
const { getUser } = require("./helper");
module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts.map(post => {
        return { ...post._doc, author: getUser.bind(this, post.author) };
      });
    } catch (err) {
      console.log("Log: : catch -> err", err);
      throw err;
    }
  },
  createPost: async args => {
    const post = new Post({
      ...args.post,
      author: "5c5b4c94441f10193b4f6087"
    });
    try {
      const result = await post.save();
      const user = await User.findById("5c5b4c94441f10193b4f6087");
      if (!user) {
        throw new Error("User not found!");
      }
      user.posts.push(post);
      await user.save();
      return { ...result._doc, author: getUser.bind(this, result.author) };
    } catch (err) {
      console.log("Log: : catch -> err", err);
      throw err;
    }
  }
};
