const { Post, User } = require("../../models");

const getUser = async userId => {
  try {
    const user = await User.findById(userId);

    return { ...user._doc, password: null, posts: getPosts.bind(this, user.posts) };
  } catch (err) {
    throw err;
  }
};
const getPosts = async postIds => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });

    return posts.map(post => {
      return { ...post._doc, author: getUser.bind(this, post.author) };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { getPosts, getUser };
