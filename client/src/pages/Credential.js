import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container, Grid, Header } from 'semantic-ui-react';

import PasswordCredential from '../components/PasswordCredential';
import CardCredential from '../components/CardCredential';
import TextCredential from '../components/TextCredential';

import {
	FETCH_CARD_QUERY,
	FETCH_PASSWORD_QUERY,
	FETCH_TEXT_QUERY
} from '../util/graphql';

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

export default Credential;
