import gql from 'graphql-tag';

export const FETCH_PASSWORDS = gql`
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

export const FETCH_CARDS = gql`
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

export const FETCH_TEXTS = gql`
	{
		getTexts {
			_id
			label
			notes
		}
	}
`;
