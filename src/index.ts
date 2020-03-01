import { GraphQLServer } from 'graphql-yoga';
import './prisma';

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

const options = {
  port: 4001
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
