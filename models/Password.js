const { model, Schema } = require('mongoose');

const PasswordSchema = new Schema({
	label: {
		type: String,
		required: true
	},
	username: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	website: {
		type: String
	},
	notes: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = model('Password', PasswordSchema);
