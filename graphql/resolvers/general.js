const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const General = require('../../models/General');
const authenticate = require('../../utils/authenticate');
const { validateGeneralInput } = require('../../utils/validators');

const resolvers = {
	Query: {
		getGenerals: async (_, __, context) => {
			const user = authenticate(context);
			try {
				const generals = await General.find({ user: user.id });
				return generals;
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Mutation: {
		addGeneral: async (
			_,
			{ generalInput: { label, text, notes } },
			context
		) => {
			try {
				const { valid, errors } = validateGeneralInput(label);
				if (valid) {
					const user = authenticate(context);
					let general = new General({
						label,
						text,
						notes,
						user: user.id
					});
					general = await general.save();
					return general;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		updateGeneral: async (
			_,
			{ generalId, generalInput: { label, text, notes } },
			context
		) => {
			try {
				const { valid, errors } = validateGeneralInput(label);
				if (valid) {
					authenticate(context);
					let general = await General.findByIdAndUpdate(generalId, {
						label,
						text,
						notes
					});
					return general;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		removeGeneral: async (_, { generalId }, context) => {
			const user = authenticate(context);
			const general = await General.findById(generalId);
			if (user.id === general.user.toString()) {
				await general.delete();
				return 'Card deleted successfully';
			} else {
				throw new AuthenticationError('No authorization');
			}
		}
	}
};

module.exports = resolvers;
