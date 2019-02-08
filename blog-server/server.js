const Koa = require("koa");
// const koaBody = require("koa-body");
const Router = require("koa-router");
const graphqlHTTP = require("koa-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

const router = new Router();
const app = new Koa();

router.all(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

app.use(router.routes());

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:${
      process.env.MONGO_PORT
    }/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3001, function() {
      console.log("Server is running on port 3001");
    });
  })
  .catch(err => {
    console.log("Log: : err", err);
  });
