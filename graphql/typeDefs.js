const gql = require('graphql-tag');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String
		key: String
		token: String
	}
	type Password {
		_id: ID
		label: String
		username: String
		password: String
		website: String
		notes: String
	}
	type Card {
		_id: ID
		label: String
		cardNumber: String
		cardHolderName: String
		cardType: String
		cvv: String
		expiry: String
		notes: String
	}
	type Text {
		_id: ID
		label: String
		notes: String
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
	}
	input PasswordInput {
		label: String!
		username: String
		password: String!
		website: String
		notes: String
	}
	input CardInput {
		label: String!
		cardNumber: String!
		cardHolderName: String!
		cardType: String!
		cvv: String!
		expiry: String!
		notes: String
	}
	input TextInput {
		label: String!
		notes: String
	}
	type Query {
		sayHi: String!
		getPasswords: [Password]
		getPassword(passwordId: String!): Password
		getCards: [Card]
		getCard(cardId: String!): Card
		getTexts: [Text]
		getText(textId: String!): Text
	}
	type Mutation {
		login(username: String!, password: String!): User!
		register(registerInput: RegisterInput): User!

		addPassword(passwordInput: PasswordInput): Password!
		updatePassword(
			passwordId: String!
			passwordInput: PasswordInput
		): Password!
		removePassword(passwordId: String!): String!

		addCard(cardInput: CardInput): Card!
		updateCard(cardID: String!, cardInput: CardInput): Card!
		removeCard(cardId: String!): String!

		addText(textInput: TextInput): Text!
		updateText(textId: String!, textInput: TextInput): Text!
		removeText(textId: String!): String!
	}
`;

module.exports = typeDefs;
