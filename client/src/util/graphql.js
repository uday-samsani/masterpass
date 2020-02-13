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
			cardExpiry
			cvv
			notes
		}
	}
`;

export const FETCH_GENERALS = gql`
	{
		getPasswords {
			_id
			label
			notes
		}
	}
`;
