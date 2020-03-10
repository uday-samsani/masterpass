import gql from 'graphql-tag';

export const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			_id
			username
			key
			token
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			_id
			username
			key
			token
		}
	}
`;

export const FETCH_PASSWORDS_QUERY = gql`
	{
		getPasswords {
			_id
			label
			username
			password
			website
			notes
		}
	}
`;

export const FETCH_CARDS_QUERY = gql`
	{
		getCards {
			_id
			label
			cardHolderName
			cardNumber
			cardType
			expiry
			cvv
			notes
		}
	}
`;

export const FETCH_TEXTS_QUERY = gql`
	{
		getTexts {
			_id
			label
			notes
		}
	}
`;

export const FETCH_PASSWORD_QUERY = gql`
	query getPassword($passwordId: String!) {
		getPassword(passwordId: $passwordId) {
			_id
			label
			username
			password
			website
			notes
		}
	}
`;

export const FETCH_CARD_QUERY = gql`
	query getCard($cardId: String!) {
		getCard(cardId: $cardId) {
			_id
			label
			cardHolderName
			cardNumber
			cardType
			expiry
			cvv
			notes
		}
	}
`;

export const FETCH_TEXT_QUERY = gql`
	query getText($textId: String!) {
		getText(textId: $textId) {
			_id
			label
			notes
		}
	}
`;

export const ADD_PASSWORD_MUTATION = gql`
	mutation addPassword(
		$label: String!
		$username: String
		$password: String!
		$website: String
		$notes: String
	) {
		addPassword(
			passwordInput: {
				label: $label
				username: $username
				password: $password
				website: $website
				notes: $notes
			}
		) {
			_id
			label
			username
			password
			website
			notes
		}
	}
`;

export const ADD_CARD_MUTATION = gql`
	mutation addCard(
		$label: String!
		$cardHolderName: String!
		$cardNumber: String!
		$cardType: String!
		$expiry: String!
		$cvv: String!
		$notes: String
	) {
		addCard(
			cardInput: {
				label: $label
				cardHolderName: $cardHolderName
				cardNumber: $cardNumber
				cardType: $cardType
				expiry: $expiry
				cvv: $cvv
				notes: $notes
			}
		) {
			_id
			label
			cardHolderName
			cardNumber
			cardType
			expiry
			cvv
			notes
		}
	}
`;

export const ADD_TEXT_MUTATION = gql`
	mutation addText($label: String!, $notes: String) {
		addText(textInput: { label: $label, notes: $notes }) {
			_id
			label
			notes
		}
	}
`;

export const UPDATE_PASSWORD_MUTATION = gql`
	mutation updatePassword(
		$passwordId: String!
		$label: String!
		$username: String!
		$password: String!
		$website: String
		$notes: String
	) {
		updatePassword(
			passwordId: $passwordId
			passwordInput: {
				label: $label
				username: $username
				password: $password
				website: $website
				notes: $notes
			}
		) {
			_id
			label
			username
			password
			website
			notes
		}
	}
`;

export const UPDATE_CARD_MUTATION = gql`
	mutation updateCard(
		$cardId: String!
		$label: String!
		$cardHolderName: String!
		$cardNumber: String!
		$cardType: String!
		$expiry: String!
		$cvv: String!
		$notes: String
	) {
		updateCard(
			cardId: $cardId
			cardInput: {
				label: $label
				cardHolderName: $cardHolderName
				cardNumber: $cardNumber
				cardType: $cardType
				expiry: $expiry
				cvv: $cvv
				notes: $notes
			}
		) {
			_id
			label
			cardHolderName
			cardNumber
			cardType
			expiry
			cvv
			notes
		}
	}
`;

export const UPDATE_TEXT_MUTATION = gql`
	mutation updateText($textId: String!, $label: String!, $notes: String) {
		updateText(
			textId: $textId
			textInput: { label: $label, notes: $notes }
		) {
			_id
			label
			notes
		}
	}
`;

export const REMOVE_PASSWORD_MUTATION = gql`
	mutation removePassword($passwordId: String!) {
		credential: removePassword(passwordId: $passwordId)
	}
`;

export const REMOVE_CARD_MUTATION = gql`
	mutation removeCard($cardId: String!) {
		credential: removeCard(cardId: $cardId)
	}
`;

export const REMOVE_TEXT_MUTATION = gql`
	mutation removeText($textId: String!) {
		credential: removeText(textId: $textId)
	}
`;
