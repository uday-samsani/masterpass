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
	key: {
		type: String,
		required: true
	}
});

module.exports = model('User', UserSchema);
