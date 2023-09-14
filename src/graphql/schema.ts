import { UserInterface } from "./../interfaces/userInterface";
const typeDefs = `#graphql

type User {
id:ID
userName:String
email:String
createdAt:String
message:String
token: String

}

type Query{
users:[User],
user(id: ID!): User,
getUserProfile:User
}
input RegisterInput{
userName:String!
email:String!
password:String!
confirmPassword:String!

}
input LoginInput {
email:String!
password:String!
}
type Mutation {
register(input:RegisterInput):User
login(input:LoginInput):User
deleteUser(id:ID!): User
}


`;
export default typeDefs;
