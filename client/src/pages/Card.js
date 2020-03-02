import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';
import { Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';

import { FETCH_CARD_QUERY } from '../util/graphql';

function Card(props) {
	const key = sessionStorage.getItem('key');
	const cardId = props.match.params.cardId;
	const {
		loading,
		data: { getCard: card },
		error
	} = useQuery(FETCH_CARD_QUERY, {
		variables: {
			cardId
		}
	});

	const deletePostCallback = () => {
		props.history.push('/mastervault');
	};

	return (
		<>
			{error ? (
				<h1>Error</h1>
			) : loading ? (
				<Loader inverted />
			) : (
				<Container>
					<Header as='h1' textAlign='center'>
						Card
					</Header>
					<Grid padded style={{ padding: '0 7em' }}>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Label'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.label,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Name of card holder'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.cardHolderName,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
							<Grid.Column width={5}>
								<Header as='h3'>{'Card number'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.cardNumber,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={4}>
								<Header as='h3'>{'Card type'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.cardType,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h3'>{'CVV'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.cvv,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h3'>{'Expiry'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.expiry,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={10}>
								<Header as='h3'>{'Notes'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										card.label,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			)}
		</>
	);
}

export default Card;
