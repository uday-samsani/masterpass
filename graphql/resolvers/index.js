const userResolvers = require('./user');
const passwordResolvers = require('./password');
const cardResolvers = require('./card');
const textResolvers = require('./text');

module.exports = {
	Query: {
		...userResolvers.Query,
		...passwordResolvers.Query,
		...cardResolvers.Query,
		...textResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...passwordResolvers.Mutation,
		...cardResolvers.Mutation,
		...textResolvers.Mutation
	}
};
