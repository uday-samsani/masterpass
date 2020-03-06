const { ApolloServer } = require('apollo-server');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();
		const { url } = await server.listen({ port: PORT });
		console.log('🚀  Server ready at ' + url);
	} catch (error) {
		console.log(error.msg);
		process.exit(1);
	}
};

startServer();
