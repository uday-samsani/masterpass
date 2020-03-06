const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
	try {
		const app = express();
		await connectDB();
		const server = new ApolloServer({
			typeDefs,
			resolvers,
			context: ({ req }) => ({ req })
		});
		server.applyMiddleware({ app, path: '/graphql' });
		// app.listen({ port: 4000 }, () =>
		// 	console.log(
		// 		`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		// 	)
		// );
		await app.listen({ port: 5000 });
		console.log('🚀 Server ready at ' + server.graphqlPath);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

startServer();
