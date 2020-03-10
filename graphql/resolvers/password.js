const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Password = require('../../models/Password');
const User = require('../../models/User');
const authenticate = require('../../utils/authenticate');
const { validatePasswordInput } = require('../../utils/validators');

const resolvers = {
	Query: {
		getPasswords: async (_, __, context) => {
			const user = authenticate(context);
			try {
				const passwords = await Password.find({ user: user.id });
				return passwords;
			} catch (error) {
				throw new Error(error);
			}
		},
		getPassword: async (_, { passwordId }, context) => {
			authenticate(context);
			try {
				const password = await Password.findById(passwordId);
				return password;
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Mutation: {
		addPassword: async (
			_,
			{ passwordInput: { label, username, password, website, notes } },
			context
		) => {
			try {
				const { valid, errors } = validatePasswordInput(
					label,
					username,
					password,
					website,
					notes
				);
				if (valid) {
					const user = authenticate(context);
					let pswd = new Password({
						label,
						username,
						password,
						website,
						notes,
						user: user.id
					});
					pswd = await pswd.save();
					return pswd;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		updatePassword: async (
			_,
			{
				passwordId,
				passwordInput: { label, username, password, website, notes }
			},
			context
		) => {
			try {
				const { valid, errors } = validatePasswordInput(
					label,
					username,
					password,
					website,
					notes
				);
				if (valid) {
					authenticate(context);
					let pwd = await Password.findByIdAndUpdate(passwordId, {
						label,
						username,
						password,
						website,
						notes
					});
					return pwd;
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		removePassword: async (_, { passwordId }, context) => {
			const user = authenticate(context);
			const password = await Password.findOne({ _id: passwordId });
			if (password) {
				if (user.id === password.user._id.toString()) {
					await password.delete();
					return 'Password deleted successfully';
				} else {
					throw new AuthenticationError('No authorization');
				}
			} else {
				throw new Error({ message: 'Password not found' });
			}
		}
	}
};

module.exports = resolvers;
