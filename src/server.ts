import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { sequelize } from "./config";

import { typeDefs, resolvers } from "./graphql";

const initApp = async () => {
  await sequelize.authenticate();
  console.log(" Db Connection has been established successfully");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req }: { req: any }) => {
      const token = req.headers.authorization;
      if (!token) {
        return Promise.resolve({});
      }

      return Promise.resolve({ token });
    },
  });

  console.log(`Server running at port : 4000 and url ${url}`);
};

initApp();
