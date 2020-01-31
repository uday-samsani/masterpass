const { model, Schema } = require('mongoose');

const CardSchema = new Schema({
	label: {
		type: String,
		required: true
	},
	cardType: {
		type: String,
		required: true
	},
	cardHolderName: {
		type: String,
		required: true
	},
	cardNumber: {
		type: String,
		required: true
	},
	cvv: {
		type: String,
		required: true
	},
	expiry: {
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

module.exports = model('Card', CardSchema);
