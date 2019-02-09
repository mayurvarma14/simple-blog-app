const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Post{
        _id:ID!
        title:String!
        content:String!
        author:User!
    }
    type User{
      _id:ID!
      email:String!
      password:String
      posts:[Post!]
    }
    type AuthData{
        userId:ID!
        token:String!
        tokenExpiration:Int!
    }
    type RootQuery{
        posts:[Post!]!
        login(email:String!,password:String!):AuthData!
    }
    input PostInput{
        title:String!
        content:String!
    }
    input UserInput{
      email:String!
      password:String!
    }
    type RootMutation{
        createPost(post:PostInput):Post
        createUser(user:UserInput):User
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
    `);
