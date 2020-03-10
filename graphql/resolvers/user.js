const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const generator = require('generate-password');
const { UserInputError } = require('apollo-server');

const env = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
	env.config();
}

const {
	validateRegisterInput,
	validateLoginInput
} = require('../../utils/validators');
const User = require('../../models/User');

const generateToken = user => {
	return jwt.sign(
		{
			id: user._id,
			username: user.username
		},
		process.env.SecretKey,
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
			return {
				...user._doc,
				_id: user._id,
				key: user.key,
				token: generateToken(user)
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
				userPassword = await bcrypt.hash(password, 12);
				const key = CryptoJS.PBKDF2(password, username, {
					keySize: 256 / 32
				}).toString();
				const data = generator.generate({
					length: 32,
					strict: true
				});
				var salt = CryptoJS.lib.WordArray.random(128 / 8);
				const newUser = new User({
					username: username,
					password: userPassword,
					key: CryptoJS.AES.encrypt(
						CryptoJS.PBKDF2(data, salt, {
							keySize: 256 / 32
						}).toString(),
						key
					).toString()
				});
				const result = await newUser.save();
				return {
					...result._doc,
					_id: result._id,
					key: result.key,
					token: generateToken(result)
				};
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

module.exports = Resolvers;
