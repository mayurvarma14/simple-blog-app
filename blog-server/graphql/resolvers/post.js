const { Post, User } = require("../../models");
const { getUser } = require("./helper");
module.exports = {
  posts: async (args, ctx) => {
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
  createPost: async (args, ctx) => {
    if (!ctx.state.isAuth) {
      throw new Error("Unauthorized");
    }
    const post = new Post({
      ...args.post,
      author: ctx.state.userId
    });
    try {
      const result = await post.save();
      const user = await User.findById(ctx.state.userId);
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
