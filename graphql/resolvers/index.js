const userResolvers = require('./user');
const passwordResolvers = require('./password');
const cardResolvers = require('./card');
const generalResolvers = require('./general');

module.exports = {
	Query: {
		...userResolvers.Query,
		...passwordResolvers.Query,
		...cardResolvers.Query,
		...generalResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...passwordResolvers.Mutation,
		...cardResolvers.Mutation,
		...generalResolvers.Mutation
	}
};
