import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';
import { Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';

import { FETCH_PASSWORD_QUERY } from '../util/graphql';

function Password(props) {
	const key = sessionStorage.getItem('key');
	const passwordId = props.match.params.passwordId;
	const {
		loading,
		data: { getPassword: password }
	} = useQuery(FETCH_PASSWORD_QUERY, {
		variables: {
			passwordId
		}
	});

	const deletePostCallback = () => {
		props.history.push('/mastervault');
	};

	return (
		<>
			{loading ? (
				<Loader inverted />
			) : (
				<Container>
					<Header as='h1' textAlign='center'>
						Password
					</Header>
					<Grid padded style={{ padding: '0 7em' }}>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Label'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										password.label,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Username'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										password.username,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
							<Grid.Column width={5}>
								<Header as='h3'>{'Password'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										password.password,
										key
									).toString(CryptoJS.enc.Utf8)}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Website'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										password.website,
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
										password.label,
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

export default Password;
