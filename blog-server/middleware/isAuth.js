const jwt = require("jsonwebtoken");
module.exports = async (ctx, next) => {
  const authHeader = ctx.get("Authorization");

  if (!authHeader) {
    ctx.state.isAuth = false;
    return next();
  }

  const token = authHeader;

  if (!token | (token === "")) {
    ctx.state.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    ctx.state.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    ctx.state.isAuth = false;
    return next();
  }

  ctx.state.isAuth = true;
  ctx.state.userId = decodedToken.userId;
  await next();
};
