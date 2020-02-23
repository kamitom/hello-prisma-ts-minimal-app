"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
require("./prisma");
const typeDefs = `
  type Query {
    hello(name: String): String
  }
`;
const resolvers = {
    Query: {
        hello: (_, { name }) => {
            const returnValue = `Hello ${name || 'World!'}`;
            return returnValue;
        }
    }
};
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('Server is running on http://localhost:4000'));
//# sourceMappingURL=index.js.map