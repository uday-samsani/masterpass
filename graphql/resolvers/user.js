const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { secretKey } = require('../../config/defaults');
const {
	validateRegisterInput,
	validateLoginInput
} = require('../../utils/validators');
const User = require('../../models/User');

const generateToken = user => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username
		},
		process.env.SecretKey || secretKey,
		{ expiresIn: '1h' }
	);
};

const Resolvers = {
	Mutation: {
		login: async (_, { username, password }) => {
			const { valid, errors } = validateLoginInput(username, password);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			const user = await User.findOne({ username });
			if (!user) {
				errors.credentials = 'Wrong credentials';
				throw new UserInputError('Credentials', { errors });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.credentials = 'Wrong credentials';
				throw new UserInputError('Credentials', { errors });
			}
			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token
			};
		},
		register: async (
			_,
			{ registerInput: { username, password, confirmPassword } }
		) => {
			const { valid, errors } = validateRegisterInput(
				username,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			try {
				const user = await User.findOne({ username });
				if (user) {
					throw new UserInputError('Username is already taken.');
				}
				password = await bcrypt.hash(password, 12);
				const newUser = new User({
					username,
					password
				});
				const result = await newUser.save();
				const token = generateToken(result);
				return {
					...result._doc,
					id: result._id,
					token
				};
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

module.exports = Resolvers;
