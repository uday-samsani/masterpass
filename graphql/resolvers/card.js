const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Card = require('../../models/Card');
const authenticate = require('../../utils/authenticate');
const { validateCardInput } = require('../../utils/validators');

const resolvers = {
	Query: {
		getCards: async (_, __, context) => {
			const user = authenticate(context);
			try {
				const cards = await Card.find({ user: user.id });
				return cards;
			} catch (error) {
				throw new Error(error);
			}
		},
		getCard: async (_, { cardId }, context) => {
			authenticate(context);
			try {
				const card = await Card.findById(cardId);
				return card;
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Mutation: {
		addCard: async (
			_,
			{
				cardInput: {
					label,
					cardNumber,
					cardHolderName,
					cardType,
					cvv,
					expiry,
					notes
				}
			},
			context
		) => {
			try {
				const { valid, errors } = validateCardInput(
					label,
					cardNumber,
					cardHolderName,
					cardType,
					cvv,
					expiry
				);
				if (valid) {
					const user = authenticate(context);
					let card = new Card({
						label,
						cardNumber,
						cardHolderName,
						cardType,
						cvv,
						expiry,
						notes,
						user: user.id
					});
					card = await card.save();
					return card;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		updateCard: async (
			_,
			{
				cardId,
				cardInput: {
					label,
					cardNumber,
					cardHolderName,
					cardType,
					cvv,
					expiry,
					notes
				}
			},
			context
		) => {
			try {
				const { valid, errors } = validateCardInput(
					label,
					cardNumber,
					cardHolderName,
					cardType,
					cvv,
					expiry
				);
				if (valid) {
					authenticate(context);
					let card = await Card.findByIdAndUpdate(cardId, {
						label,
						cardNumber,
						cardHolderName,
						cardType,
						cvv,
						expiry,
						notes
					});
					return card;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		removeCard: async (_, { cardId }, context) => {
			const user = authenticate(context);
			const card = await Card.findOne({ _id: cardId });
			if (card) {
				if (user.id === card.user.toString()) {
					await card.delete();
					return 'Card deleted successfully';
				} else {
					throw new AuthenticationError('No authorization');
				}
			} else {
				throw new Error({ message: 'Card not found' });
			}
		}
	}
};

module.exports = resolvers;
