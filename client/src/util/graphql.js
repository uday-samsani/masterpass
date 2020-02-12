import gql from 'graphql-tag';

export const FETCH_PASSWORDS = gql`
	{
		getPasswords {
			_id
			label
			username
			website
		}
	}
`;
