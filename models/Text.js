const { model, Schema } = require('mongoose');

const TextSchema = new Schema({
	label: {
		type: String,
		required: true
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

module.exports = model('Text', TextSchema);
