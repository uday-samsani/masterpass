module.exports.validateRegisterInput = (
	username,
	password,
	confirmPassword
) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	if (password === '') {
		errors.password = 'Password must not be empty';
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords must match';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	if (password === '') {
		errors.password = 'Password must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

module.exports.validatePasswordInput = (label, password) => {
	const errors = {};
	if (label.trim() === '') {
		errors.label = 'Label must not be empty';
	}
	if (password.trim() === '') {
		errors.password = 'Password must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

module.exports.validateCardInput = (
	label,
	cardNumber,
	cardHolderName,
	cardType,
	cvv,
	expiry
) => {
	const errors = {};
	if (label.trim() === '') {
		errors.label = 'Label must not be empty';
	}
	if (cardHolderName.trim() === '') {
		errors.cardHolderName = 'Card holder name must not be empty';
	}
	if (cardNumber.trim() === '') {
		errors.cardNumber = 'Card number must not be empty';
	}
	if (cardType.trim() === '') {
		errors.cardType = 'Card type must not be empty';
	}
	if (cvv.trim() === '') {
		errors.cvv = 'Cvv must not be empty';
	}
	if (expiry.trim() === '') {
		errors.expiry = 'Expiry must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

module.exports.validateGeneralInput = label => {
	const errors = {};
	if (label.trim() === '') {
		errors.label = 'Label must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};
