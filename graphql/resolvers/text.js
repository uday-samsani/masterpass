const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Text = require('../../models/Text');
const authenticate = require('../../utils/authenticate');
const { validateGeneralInput } = require('../../utils/validators');

const resolvers = {
	Query: {
		getTexts: async (_, __, context) => {
			const user = authenticate(context);
			try {
				const texts = await Text.find({ user: user.id });
				return texts;
			} catch (error) {
				throw new Error(error);
			}
		},
		getText: async (_, { textId }, context) => {
			authenticate(context);
			try {
				const text = await Text.findById(textId);
				return text;
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Mutation: {
		addText: async (_, { textInput: { label, notes } }, context) => {
			try {
				const { valid, errors } = validateGeneralInput(label);
				if (valid) {
					const user = authenticate(context);
					let text = new Text({
						label,
						notes,
						user: user.id
					});
					text = await text.save();
					return text;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		updateText: async (
			_,
			{ textId, textInput: { label, notes } },
			context
		) => {
			try {
				const { valid, errors } = validateGeneralInput(label);
				if (valid) {
					authenticate(context);
					let text = await Text.findByIdAndUpdate(textId, {
						label,
						notes
					});
					return text;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		removeText: async (_, { textId }, context) => {
			const user = authenticate(context);
			const text = await Text.findOne({ _id: textId });
			if (text) {
				if (user.id === text.user.toString()) {
					await text.delete();
					return 'Text deleted successfully';
				} else {
					throw new AuthenticationError('No authorization');
				}
			} else {
				throw new Error({ messgae: 'Text not found' });
			}
		}
	}
};

module.exports = resolvers;
