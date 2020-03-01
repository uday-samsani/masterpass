import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Container, Grid, Header } from 'semantic-ui-react';

import PasswordCredential from '../components/PasswordCredential';
import CardCredential from '../components/CardCredential';
import TextCredential from '../components/TextCredential';

function Credential(props) {
	const credId = props.location.state.credId;
	const credType = props.location.state.credType;
	const credQuery =
		credType === 'password'
			? FETCH_PASSWORD_QUERY
			: credType === 'card'
			? FETCH_CARD_QUERY
			: FETCH_TEXT_QUERY;

	const {
		data: { credential }
	} = useQuery(credQuery, {
		variables: {
			credId
		}
	});

	let postMarkup;
	console.log(credential);
	if (!credential) {
		postMarkup = <p>Loading post..</p>;
	} else {
		postMarkup = (
			<Grid as={Container} fluid style={{ padding: '2em' }} columns={8}>
				<Grid.Row>
					<Grid.Column>
						<Header as='h1' style={{ fontSize: '3em' }}>
							{credential.__typename}
						</Header>
					</Grid.Column>
				</Grid.Row>
				{credential.__typename === 'Password' ? (
					<PasswordCredential credential={credential} />
				) : credential.__typename === 'Card' ? (
					<CardCredential credential={credential} />
				) : (
					<TextCredential credential={credential} />
				)}
			</Grid>
		);
	}
	return postMarkup;
}

const FETCH_PASSWORD_QUERY = gql`
	query getPassword($credId: String!) {
		credential: getPassword(passwordId: $credId) {
			_id
			label
			username
			password
			notes
		}
	}
`;

const FETCH_CARD_QUERY = gql`
	query getCard($credId: String!) {
		credential: getCard(cardId: $credId) {
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

const FETCH_TEXT_QUERY = gql`
	query getText($credId: String!) {
		credential: getText(textId: $credId) {
			_id
			label
			notes
		}
	}
`;

export default Credential;
