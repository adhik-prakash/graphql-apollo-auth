const typeDefs = `#graphql

type User {
id:ID
userName:String
password:String
email:String
createdAt:String
message:String

}

type Query{
users:[User]
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

}


`;
export default typeDefs;
