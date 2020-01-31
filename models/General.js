const { model, Schema } = require('mongoose');

const GeneralSchema = new Schema({
	label: {
		type: String,
		required: true
	},
	text: {
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

module.exports = model('General', GeneralSchema);
