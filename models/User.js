const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	passwords: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Password'
		}
	],
	cards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Card'
		}
	],
	general: [
		{
			type: Schema.Types.ObjectId,
			ref: 'General'
		}
	]
});

module.exports = model('User', UserSchema);
