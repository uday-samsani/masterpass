import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';
import { Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';

import { FETCH_TEXT_QUERY } from '../util/graphql';

function Text(props) {
	const key = sessionStorage.getItem('key');
	const textId = props.match.params.textId;
	const {
		loading,
		data: { getText: text }
	} = useQuery(FETCH_TEXT_QUERY, {
		variables: {
			textId
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
						Text
					</Header>
					<Grid padded style={{ padding: '0 7em' }}>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as='h3'>{'Label'}</Header>
								<Segment>
									{CryptoJS.AES.decrypt(
										text.label,
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
										text.notes,
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

export default Text;
